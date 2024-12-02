<script lang="ts">
	import type { IPerson } from '$lib/data/appModel';
	import { onMount } from 'svelte';
	import Select from 'svelte-select';
	import PersonPicker from './PersonPicker.svelte';
	import { fetchPerson } from '$lib/stores/personStore';
	import { updatePerson } from '$lib/stores/personStore';

	let { person, title, operationComplete } = $props();

	let mother: IPerson | null = $state(null);
	let father: IPerson | null = $state(null);

	onMount(async () => {
		if (person) {
			if (person.mother) mother = await fetchRelation(person.mother);
			if (person.father) father = await fetchRelation(person.father);
		}
	});

	// Form state
	let formData: IPerson = $state(fillFormData());

	function fillFormData(): IPerson {
		if (person) {
			return {
				...person,
				created_at: person.created_at || new Date(),
				born: new Date(person.born),
				fullname: generateFullName(person)
			};
		} else {
			return {
				id: crypto.randomUUID(),
				created_at: new Date(),
				last_edited_by: '135988a0-a171-4c0b-86b1-8dec0208fe49',
				first_name: '',
				last_name: '',
				born: new Date(),
				sex: '',
				fullname: '',
				died: undefined,
				died_where: undefined,
				born_where: undefined,
				middle_name: undefined,
				maiden_name: undefined,
				alias: undefined,
				mother: undefined,
				father: undefined,
				step_mother: undefined,
				step_father: undefined
			};
		}
	}

	const genderOptions: string[] = ['Male', 'Female'];

	async function fetchRelation(id: string) {
		return await fetchPerson(id);
	}

	function formatDateForInput(date: Date | undefined): string {
		if (!date) return '';
		return date instanceof Date ? date.toISOString().split('T')[0] : '';
	}

	function handlePersonSelected(person: IPerson) {}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		e.stopPropagation();

		const target = e.target as HTMLFormElement;
		if (target.id === 'submit') {
			const { ...cleanFormData } = formData;
			const updatedPerson: IPerson = {
				...cleanFormData,
				created_at: formData.created_at || new Date(),
				born: new Date(formData.born),
				died: formData.died ? new Date(formData.died) : undefined,
				fullname: generateFullName(formData),
				sex: (formData.sex as unknown as { index: number; label: string; value: string }).value,
				mother: mother?.id || undefined,
				father: father?.id || undefined
			};

			operationComplete(new CustomEvent('operationComplete', { detail: updatedPerson }));
		} else {
			operationComplete(new CustomEvent('operationComplete', { detail: null }));
		}
	}

	function generateFullName(data: typeof formData): string {
		const parts = [data.first_name, data.middle_name, data.last_name].filter(Boolean);

		let name = parts.join(' ');

		if (data.sex === 'Female' && data.maiden_name) {
			name += ` (née ${data.maiden_name})`;
		}

		return name.trim();
	}
</script>

<div class="person-form">
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div class="header">
		<h2>{title}</h2>
	</div>
	<div class="body-section">
		<form onsubmit={handleSubmit}>
			<div class="field">
				<h3>Required Fields</h3>
			</div>

			<div class="row">
				<div class="column">
					<label for="first_name">First Name</label>
					<input
						type="text"
						id="first_name"
						bind:value={formData.first_name}
						required
						autocomplete="given-name"
					/>
				</div>
				<div class="column">
					<label for="last_name">Last&nbsp;Name</label>
					<input type="text" id="last_name" bind:value={formData.last_name} required />
				</div>

				<div class="column">
					<label for="born">Born</label>
					<input
						type="date"
						id="born"
						value={formatDateForInput(formData.born)}
						oninput={(e) => (formData.born = new Date(e.currentTarget.value))}
						required
					/>
				</div>
				<div class="column">
					<label class="picker" for="mother">Mother</label>
					<div class="field-value">
						<PersonPicker
							bind:selectedPerson={mother}
							personType="Mother"
							personSelected={handlePersonSelected}
						/>
					</div>
				</div>
				<div class="column">
					<label class="picker" for="father">Father</label>
					<div class="field-value">
						<PersonPicker
							bind:selectedPerson={father}
							personType="Father"
							personSelected={handlePersonSelected}
						/>
					</div>
				</div>
				<div class="column">
					<label for="Gender">Sex</label>
					<div class="select-box">
						<Select items={genderOptions} bind:value={formData.sex} required />
					</div>
				</div>
			</div>
			<div class="field">
				<h3>Optional Fields</h3>
				<!------------------------------------------->
			</div>
			<div class="row">
				<div class="column">
					<label for="alias">Alias</label>
					<input type="text" id="alias" bind:value={formData.alias} />
				</div>
				<div class="column">
					<label for="middle_name">Middle&nbsp;Name</label>
					<input type="text" id="middle_name" bind:value={formData.middle_name} />
				</div>
				{#if formData.sex === 'Female'}
				<div class="column">
					<label for="maiden_name">Maiden&nbsp;Name</label>
						<input type="text" id="maiden_name" bind:value={formData.maiden_name} />
					</div>
				{/if}	
				<div class="column">
					<label for="born_where">Born&nbsp;Where</label>
					<input type="text" id="born_where" bind:value={formData.born_where} />
				</div>
				<div class="column">
					<label for="died">Passed&nbsp;Away</label>
					<input type="date" id="died" bind:value={formData.died} />
				</div>
				<div class="column">
					<label for="died_where">Burried&nbsp;Where</label>
					<input type="text" id="died_where" bind:value={formData.died_where} />
				</div>
			</div>
		</form>
	</div>
	<div class="footer">
		<button id="close" class="cancel-button" onclick={(e) => operationComplete(new CustomEvent('operationComplete', { detail: null }))}>Close</button>
		<button id="submit" class="accept-button" onclick={handleSubmit}>Save</button>
	</div>
</div>

<style>
	.accept-button {
		background-color: rgb(18, 139, 2);
		box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 1);
		color: white;
		width: 135px;
	}

	.body-section {
		padding-inline: 1rem;
		width: 100%;
		background-color: #dadada;
	}

	button {
		color: #fff;
		cursor: pointer;
		display: inline-block;
		font-family: 'Roboto', sans-serif;
		font-size: 1.2rem;
		font-weight: 600;
		outline: 0;
		padding: 0.5rem 1rem;
		text-align: center;
		touch-action: manipulation;
		transition: all 0.3s;
		user-select: none;
		-webkit-transition: all 0.3s;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-touch-action: manipulation;
		-ms-user-select: none;
		margin-inline: 1rem;
	}

	button:before {
		background-color: initial;
		background-image: linear-gradient(#fff 0, rgba(255, 255, 255, 0) 100%);
		background-image: -webkit-gradient(
			linear,
			left top,
			left bottom,
			color-stop(0, #fff),
			to(rgba(255, 255, 255, 0))
		);
		border-radius: 125px;
		content: '';
		height: 50%;
		left: 4%;
		opacity: 0.5;
		position: absolute;
		top: 0;
		transition: all 0.3s;
		-webkit-transition: all 0.3s;
		width: 92%;
	}

	button:hover {
		box-shadow:
			rgba(255, 255, 255, 0.2) 0 3px 15px inset,
			rgba(0, 0, 0, 0.1) 0 3px 5px,
			rgba(0, 0, 0, 0.1) 0 10px 13px;
		transform: scale(1.05);
		-webkit-box-shadow:
			rgba(255, 255, 255, 0.2) 0 3px 15px inset,
			rgba(0, 0, 0, 0.1) 0 3px 5px,
			rgba(0, 0, 0, 0.1) 0 10px 13px;
		-webkit-transform: scale(1.05);
		-ms-transform: scale(1.05);
	}

	.cancel-button {
		background-color: rgb(139, 7, 2);
		box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 1);
		color: white;
		width: 135px;
	}

	.column {
		align-items: flex-start;
		display: flex;
		flex-direction: column;
	}

	.field {
		align-items: center;
		display: flex;
		flex-direction: row;
		padding-block: 0.25rem;
		width: 100%;
	}

	.field-value {
		margin-inline-end: 1rem;
		width: 200px;
	}

	.footer {
		background-color:  #a3a3a3c5;
		border-top: 1px solid #3a3a3ac5;
		border-bottom-left-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
		/* box-shadow: 0 2px 15px 0 rgb(119, 119, 119); */
		color: #012235c5;

		display: flex;
		flex-direction: row;
		font-size: 1.5rem;
		font-weight: bold;
		justify-content: flex-end;
		margin-block-start: 2rem;
		padding-block: 0.5rem;
		width: 100%;
	}

	form {
		width: 100%;
	}

	h3 {
		color: #012235c5;
		font-size: 1.25rem;
		font-weight: bold;
		width: 100%;
		padding-block: 0.5rem;
	}


	.header {
		background-color: #525252c5;
		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
		/* box-shadow: 0px 2px 15px 0 rgba(0, 0, 0, 0.2); */
		text-shadow: 1px 1px 2px #000000;
		color: #ffffff;
		font-size: 1.5rem;
		font-weight: bold;
		margin-block-end: 0.5rem;
		padding-block: 1rem;
		padding-inline: 1rem;
		width: 100%;
	}

	input {
		border: 1px solid #dadada;
		border-radius: 0.5rem;
		font-size: 1rem;
		margin-block: 0.25rem;
		margin-inline-end: 1rem;
		padding-block: 0.5rem;
		padding-inline: 0.5rem;
		width: 180px;
	}

	input[type='date'] {
		border: 1px solid #dadada;
		border-radius: 0.5rem;
		font-family: 'Roboto', sans-serif;
		font-size: 1rem;
		margin-block: 0.25rem;
		padding-block: 0.5rem;
		padding-inline: 0.5rem;
		width: 180px;
	}

	label {
		padding-block-start: 0.5rem;
		padding-inline-start: 0.5rem;
		text-align: left;
		width: 100px;
	}

	.person-form {
		align-items: flex-start;
		display: flex;
		flex-direction: column;
		font-family: 'Roboto', sans-serif;
		width: 100%;
		background-color: #dadada;
	}

	.picker {
		padding-inline-start: 2.5rem;
		text-align: left;
		width: 100px;
	}

	.row {
		align-items: flex-start;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.select-box {
		display: inline-block;
		margin-inline-end: 1rem;
		width: 140px;
	}
</style>
