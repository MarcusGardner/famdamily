<script lang="ts">


	import { addPerson, updatePerson } from '../stores/personStore';
	import type { IPerson } from '../data/appModel';

	import PersonForm from './PersonForm.svelte';
	import type { SvelteComponent } from 'svelte';
	import { updated } from '$app/stores';

	let {isVisible = $bindable(), selectedPerson, title, wizardComplete} = $props();



	const actions = [
		'Add a New Person',
		'Edit the Selected Person'
	];

	async function handlePersonAdded(newPerson: IPerson) {
		await addPerson(newPerson);
		handleClose();
	}

	async function handlePersonUpdated(updatedPerson: IPerson) {
		try {
			if (!updatedPerson) {
				// sent here by close button				
				handleClose();
				return;
			}

			// Update the selected person with the new data
			// Format the date to YYYY-MM-DD
			if (updatedPerson.born) {
				updatedPerson.born = new Date(updatedPerson.born) as unknown as Date;
			}	
			await updatePerson(updatedPerson);
			handleClose();


		} catch (error) {
			console.error('Error handling person update:', error);
			// Add error handling UI feedback here
		}
	}

	function handleClose() {
		isVisible = false;
		wizardComplete();
	}

</script>

{#if isVisible}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="backdrop"
		onclick={handleClose}
		onkeydown={(e) => {
			if (e.key === 'Escape') {
				isVisible = false;
			}
		}}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div class="wizard" role="dialog" onclick={(e) => e.stopPropagation()} onkeydown={(e) => {
			if (e.key === 'Escape') {
				handleClose();
			}}}>

			{#if !selectedPerson}
				<PersonForm 
					person={null} 
					title = {title}
					operationComplete={(e: CustomEvent<IPerson>) => handlePersonAdded(e.detail)} 
				/>
			{:else if selectedPerson}
				<PersonForm 
					person={selectedPerson} 
					title = {title}
					operationComplete={(e: CustomEvent<IPerson>) => {
						handlePersonUpdated(e.detail);
					}}
				/>
			{/if}
		</div>
	</div>
{/if}

<style>
	.backdrop {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}
	.wizard {
		display: flex;
        font-family: 'Roboto', sans-serif;
		flex-direction: column;
		overflow-y: auto;
		border: 3px solid #3a3a3ac5;
		overflow-x: hidden;
		border-radius: 0.75rem;
		z-index: 101;
		box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.6);
		max-width: 80%;
		max-height: 95%;
	}
	@media (min-width: 768px) {
		.wizard {
			width: 95%;
		}
	}

</style>
