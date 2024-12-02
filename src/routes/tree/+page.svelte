<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import {
		selectedPerson,
		fetchParents,
		fetchPartners,
		fetchChildren,
		people,
		fetchPeople,
		fetchPerson,
		fetchSiblings
	} from '$lib/stores/personStore';
	import type { IPerson } from '$lib/data/appModel';
	import PersonCard from '$lib/components/PersonCard.svelte';
	import PersonSearchPopover from '$lib/components/PersonSearchPopover.svelte';
	import LoaderBouncing from '$lib/components/LoaderBouncing.svelte';
	import Wizard from '$lib/components/Wizard.svelte';
	import { goto } from '$app/navigation';
	import { isAuthenticated } from '$lib/stores/authStore';

	// State management
	let isPopoverOpen = $state(false);
	let isLoadingMain = $state(false);
	let isEditorVisible = $state(false);

	let personToEdit: IPerson | null = $state(null);
	let selectedAction = $state('');
	let editorTitle = $state('');

	// Family data
	let parents: IPerson[] = $state([]);
	let siblings: IPerson[] = $state([]);
	let partners: Array<{
		otherPartnerPerson: IPerson;
		childrenWithPersonData: IPerson[];
	}> = $state([]);

	onMount(() => {
		if (!$isAuthenticated) {
			goto('/login?redirectTo=/tree');
			return;
		}
		reloadTree();
	});

	async function reloadTree() {
		isEditorVisible = false;
		resetFamilyData();
		await loadPeopleData();
		if ($selectedPerson) {
			await loadFamilyRelations();
		}
	}

	function resetFamilyData() {
		parents = [];
		siblings = [];
		partners = [];
	}

	async function loadPeopleData() {
		const fetchedPeople = await fetchPeople();
		people.set(fetchedPeople);
	}

	async function loadFamilyRelations() {
		try {
			isLoadingMain = true;
			await updateSelectedPerson();
			await loadParentsAndSiblings();
			await loadPartnersAndChildren();
		} catch (error) {
			console.error('Failed to load family relations:', error);
		} finally {
			isLoadingMain = false;
		}
	}

	async function updateSelectedPerson() {
		if ($selectedPerson) {
			const updatedPerson = await fetchPerson($selectedPerson.id);
			selectedPerson.set(updatedPerson);
		}
	}

	async function loadParentsAndSiblings() {
		if (!$selectedPerson) return;
		parents = (await fetchParents($selectedPerson.id)) || [];
		if (parents.length > 0) {
			siblings = await Promise.resolve(fetchSiblings($selectedPerson.id, parents)) || [];
		}
	}

	async function loadPartnersAndChildren() {
		if (!$selectedPerson) return;
		const tempPartners = await fetchPartners($selectedPerson.id);
		partners = tempPartners.map((partner) => ({
			otherPartnerPerson: partner,
			childrenWithPersonData: fetchChildren(partner.id, $selectedPerson.id)
		}));
	}

	function handlePersonSelection(person: IPerson) {
		selectedPerson.set(person);
		reloadTree();
		isPopoverOpen = false;
	}

	function handleEditorOpen(action: string, person: IPerson | null) {
		selectedAction = action;
		personToEdit = person;
		if (person) {
			editorTitle = `${action} ${person.first_name} ${person.last_name}`;
		} else {
			editorTitle = `${action} New Person`;
		}
		isEditorVisible = true;
	}

</script>

<!-- Search Popover -->
{#if isPopoverOpen}
	<div transition:fly={{ y: 0, duration: 20 }}>
		<PersonSearchPopover
			bind:isVisible={isPopoverOpen}
			on:close={() => (isPopoverOpen = false)}
			on:personSelected={(e) => handlePersonSelection(e.detail)}
		/>
	</div>
{/if}

<!-- Main Tree View -->
<div class="tree-page">
	<!-- Action Buttons -->
	{#if $selectedPerson}
		<div class="action-buttons">
			<button
				class="action-button edit-button"
				onclick={() => handleEditorOpen('Add', null)}
				aria-label="Show family relationship editor"
			>
				<i class="fas fa-plus"></i>
			</button>
			<button
				class="action-button edit-button"
				onclick={() => handleEditorOpen('Edit', $selectedPerson)}
				aria-label="Show family relationship editor"
			>
				<i class="fas fa-pencil"></i>
			</button>
			<button
				class="action-button search-button"
				onclick={() => (isPopoverOpen = !isPopoverOpen)}
				aria-label={isPopoverOpen ? 'Close search' : 'Open search'}
			>
			<i class={isPopoverOpen ? 'fas fa-arrow-left' : 'fas fa-magnifying-glass'}></i>
			</button>
		</div>
	{/if}
	<!-- Loading -->
	{#if isLoadingMain}
		<div class="loader">
			<LoaderBouncing />
		</div>
	{:else}
		{#if parents.length > 0}
			<!-- Parents Section -->
			<section class="tree-section">
				<h2 class="section-title"><i class="fas fa-user-group"></i>&nbsp;Parents</h2>
				<div class="cards-container">
					{#each parents as parent}
						<div class="card-wrapper">
							<div class="relation-label">{parent.sex === 'Male' ? 'Father' : 'Mother'}</div>
							<PersonCard
								person={parent}
								onEdit={() => handleEditorOpen('Edit', parent)}
								onView={() => handlePersonSelection(parent)}
							/>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Selected Person & Siblings Section -->
		{#if $selectedPerson}
			<section class="tree-section selected-section">
				<h2 class="section-title">
					{#if $selectedPerson}
						<i class="fas fa-circle-user"></i>&nbsp;Selected Person & Siblings
					{:else}
						No Person Selected
					{/if}
				</h2>
				<div class="selected-person-container">
					<div class="siblings-row">
						<div class="card-wrapper">
							<div class="relation-label">
								<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Selected Person</span>
							</div>
							<div class="row">
								<i class="fas fa-thumbtack big-red"></i>
								<PersonCard
								person={$selectedPerson}
								isSelected={true}
								onEdit={() => handleEditorOpen('Edit', $selectedPerson)}
								onView={() => handlePersonSelection($selectedPerson)}
								showView={false}
								swapSides={true}
								/>
							</div>
						</div>

						{#if siblings.length > 0}
							{#each siblings as sibling}
								{#if sibling.last_name !== 'Children'}
									<div class="card-wrapper">
										<div class="relation-label">{sibling.sex === 'Male' ? 'Brother' : 'Sister'}</div>
										<PersonCard
											person={sibling}
											onEdit={() => handleEditorOpen('Edit', sibling)}
											onView={() => handlePersonSelection(sibling)}
										/>
									</div>
								{/if}
							{/each}
						{/if}
					</div>
				</div>
			</section>
		{:else}
			<div class="empty-state">
				<div class="empty-state-content">
					<h1>Why are you here?</h1>
					<div class="advice">
						<div class="text">
							<h2>You're brand new here.</h2>
							<p>Use the Add button to add your first new person.</p>
						</div>
						<button
							class="action-button edit-button"
							onclick={() => handleEditorOpen('Edit', $selectedPerson)}
							aria-label="Show family relationship editor"
						>
							<i class="fas fa-plus"></i>
						</button>
					</div>
					<div class="advice">
						<div class="text">
							<h2>No actively selected person.</h2>
							<p>Use the Search button to find a person to view.</p>
							<p>You can also use the Add/Edit button to add a new person.</p>
							<p>If you go to the home page, all the current data is reloaded.</p>
						</div>
						<button
							class="action-button search-button"
							onclick={() => (isPopoverOpen = !isPopoverOpen)}
							aria-label={isPopoverOpen ? 'Close search' : 'Open search'}
						>
							<i class='fas fa-magnifying-glass'></i>
						</button>
					</div>
					<div class="advice">
						<div class="text">
							<h2>Something's gone awry.</h2>
							<p>Try visiting the <a href="/">Home page</a> then returning here.</p>
						</div>
						<button
							class="action-button home-button"
							onclick={() => goto('/')}
							aria-label="Go to home page"
						>
							<i class='fas fa-home'></i>
						</button>
					</div>
				</div>
			</div>
		{/if}

		<!-- Partners & Children Section -->
		{#if partners.length > 0}
			<section class="tree-section">
				<h2 class="section-title"><i class="fas fa-heart med-red"></i>&nbsp;Relationships</h2>
				<div class="partners-container">

					{#each partners as { otherPartnerPerson, childrenWithPersonData }}
					<div class="row">
							<div class="card-wrapper">
								<div class="relation-label">
									Partner
								</div>
								<PersonCard
									person={otherPartnerPerson}
									onEdit={() => handleEditorOpen('Edit', otherPartnerPerson)}
									onView={() => handlePersonSelection(otherPartnerPerson)}
								/>
							</div>
							{#each childrenWithPersonData as child}
								{#if child.last_name !== 'Children'}
									<div class="card-wrapper">
										<div class="relation-label">{child.sex === 'Male' ? 'Son' : 'Daughter'}</div>
										<PersonCard
											person={child}
											isSelected={true}
											onEdit={() => handleEditorOpen('Edit', child)}
											onView={() => handlePersonSelection(child)}
											/>
										</div>
								{/if}
							{/each}
						</div>
					{/each}
				</div>
			</section>
		{/if}
	{/if}

	<!-- Wizard Modal -->
	{#if isEditorVisible}
		<Wizard
			bind:isVisible={isEditorVisible}
			selectedPerson={personToEdit}
			title={editorTitle}
			wizardComplete={reloadTree}
		/>
	{/if}
</div>

<style>
	a {
		color: #0078d0;
		text-decoration: underline;
	}

	.action-button {
		align-items: center;
		background-color: #0078d0;
		border-radius: 50%;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		color: white;
		display: flex;
		height: 3rem;
		justify-content: center;
		transition: background-color 0.3s ease;
		width: 3rem;
	}

	.action-button:hover {
		background-color: #005fa3;
	}

	.action-button i {
		font-size: 1.5rem;
	}

	.action-buttons {
		display: flex;
		gap: 1rem;
		position: fixed;
		right: 3rem;
		top: 85px;
		z-index: 10;
	}

	.advice {
		align-items: center;
		background-color: #f0f8ff;
		border-radius: 0.5rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
		display: flex;
		gap: 1rem;
		justify-content: space-between;
		margin-block-end: 3rem;
		padding: 1rem;
	}

	.advice .text {
		flex: 1;
	}

	.big-red {
		color: red;
		font-size: 2.5rem;
	}
	.cards-container {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		justify-content: center;

	}

	.card-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.empty-state {
		align-items: center;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 1rem;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		color: #2b5b77;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 3rem;
	}

	.empty-state-content {
		max-width: 600px;
		text-align: center;
	}

	h1 {
		color: #2b5b77;
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	h2 {
		color: #2b5b77;
		font-size: 1.5rem;
		padding-block-end: 1rem;
		margin-block-end: 1rem;
	}

	.loader {
		align-items: center;
		display: flex;
		height: 50vh;
		justify-content: center;
	}
	.med-red {
		color: red;
		font-size: 1.5rem;
	}	
	p {
		color: #2b5b77;
		font-size: 1rem;
	}

	.partners-container {
		align-items: center;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 1rem;
		background-color: rgb(247, 247, 247);
	}

	.relation-label {
		color: rgba(2, 119, 187);
		display: flex;
		font-size: 1rem;
		font-weight: bold;
		padding-block-start: .5rem;
		padding-inline-start: 1rem;

	}

	.row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}

	.section-title {
		width: 100%;
		text-align: center;
		color: rgb(27, 93, 138);
		font-size: 1.5rem;
		font-weight: bold;
		background-color: rgba(255, 255, 255, 0.9);
		border-block-end: 1px solid #79c5fc;
		padding-block-start: 1rem;
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
	}

	.selected-section {
		background-color: rgba(30, 143, 255, 0.171);
		border: 2px solid #89d4ff;
		box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.6);
	}

	.siblings-row {
		align-items: flex-start;
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		justify-content: center;
	}

	.text p {
		line-height: 1.5;
	}

	.tree-page {
		overflow-x: hidden;
		overflow-y: auto;
		padding: 2rem;
	}

	.tree-section {
		border-radius: 1rem;
		border: 1px solid #73ccff;
		background-color: rgb(247, 247, 247);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
		margin: 1.5rem 0;
		padding-block-end: 1rem;

	}
</style>
