<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { IPerson } from '../data/appModel';
	import Select from 'svelte-select/Select.svelte';
	import PersonSearchPopover from './PersonSearchPopover.svelte';

	const dispatch = createEventDispatcher();

	// State variables
	let selectedPerson: IPerson | null = null;
	let selectedOption: string | null = null;

	// Options for the second input
	const options = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' }
	];

	// Function to handle person selection
	function handlePersonSelect(person: IPerson) {
		selectedPerson = person;
	}

	// Function to handle option selection
	function handleOptionSelect(option: string) {
		selectedOption = option;
	}
</script>

<!-- Person Selection Input -->
{#if !selectedPerson}
	<div class="person-picker">
		<PersonSearchPopover
			on:personSelected={(e: CustomEvent<IPerson>) => handlePersonSelect(e.detail)}
		/>
	</div>
{/if}

<!-- Options Input -->
{#if selectedPerson && !selectedOption}
	<div class="option-picker">
		<Select
			items={options}
			bind:value={selectedOption}
			placeholder="Select an Option"
			on:change={(e) => handleOptionSelect(e.detail)}
		/>
	</div>
{/if}

<!-- Remaining Controls -->
{#if selectedPerson && selectedOption}
	<div class="additional-controls">
		<!-- Add your additional input controls here -->
		<p>Additional controls for {selectedOption}</p>
	</div>
{/if}

<style>
	.person-picker, .option-picker, .additional-controls {
		margin: 1rem 0;
	}
</style>
