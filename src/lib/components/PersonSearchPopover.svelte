<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { IPerson } from '../data/appModel';
	import { people } from '../stores/personStore';
	
	const dispatch = createEventDispatcher();
	
	export let isVisible = false;
	
	let searchQuery = '';
	
	function selectPerson(person: IPerson) {
		dispatch('personSelected', person);
	}

	// Reactive statement to filter and sort people
	$: filteredPeople = $people
		.filter(person => person.fullname.toLowerCase().includes(searchQuery.toLowerCase()))
		.sort((a, b) => a.fullname.localeCompare(b.fullname));

	// Add this action
	const focus = (node: HTMLElement) => {
		if (isVisible) {
			node.focus();
		}
	};

</script>

{#if isVisible}
	<div class="popover" >
		<p class="popover-count">{$people.length}</p>
		<div class="popover-header">
			<button
				on:click={() => dispatch('close')}
				class="close-button"
				aria-label="Close popover"
				tabindex="0"><i class="fa-solid fa-xmark"></i></button
			>
			<h2>Search</h2>
		</div>
		<div class="search-container">
			<div class="search-control">
				<i class="fa-solid fa-magnifying-glass"></i>
				<input
					class="search-input"
					type="text"
					bind:value={searchQuery}
					placeholder="Search..."
					use:focus
				/>
			</div>
		</div>
		<div class="list-container">
			<ul>
				{#each filteredPeople as person}
				<li>
					<button type="button" on:click={() => selectPerson(person)}>
						{person.fullname}
					</button>
				</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}


<style>
	.popover {
		position: absolute;
		top: 5vh;
		left: calc(50vw - 150px) ;
		bottom: 5vh;
		width: 300px;
		background-color: white;
		border: 1px solid #f0efeffd;
		border-radius: 1rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
		z-index: 1000;
		overflow-x: hidden;
	}
	.popover-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: 600;
		padding-inline-end: 90px;
		padding-block-start: 0.7rem;
		padding-inline-start: 0.1rem;
		background-color: #f0efeffd;
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
	}
	.close-button {
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		cursor: pointer;
		font-size: 1.5rem;
		height: 2rem;
		width: 2rem;
		color: white;
		border-radius: 50%;
		background-color: rgb(170, 0, 0);
		margin-inline-start: 0.5rem;
	}
	.popover-count {
		position: absolute;
		top: 43px;
		right: 19px;
		font-size: .8rem;
		padding-inline: 0.8rem;
		padding-block-start: 0.5rem;
		padding-block-end: 0.3rem;
		background-color: #ff9100fd;
		color: #161616;
		width: fit-content;
		height: fit-content;
		border-radius: 2rem;
	}
	h2 {
		font-size: 1.75rem;
		font-weight: 600;
	}
	.search-container {
		padding-inline: 1rem;
		padding-block: 0.5rem;
		background-color: #f0efeffd;
	}
	.search-control {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		border-radius: 3rem;
		border: 1px solid #ccc;
		padding-inline: 0.5rem;
		padding-block: 0.25rem;
		margin-block-end: 0.5rem;
	}
	.search-control i {
		font-size: 1.25rem;
		padding-inline-end: 0.5rem;
	}
	.search-input {
		width: 100%;
		height: 2rem;
		border: none;
		padding-inline: 0.5rem;
		border-radius: 0.5rem;
		font-size: 1.2rem;
	}
	.search-input:focus {
		outline: none;
	}
	.list-container {
		position: absolute;
		top: 120px;
		left: 0;
		right: 0;
		bottom: 10px;
	
		overflow-y: auto;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		border: none;
		border-radius: 0.5rem;
		overflow-y: auto;

	}

	li {
		padding-inline: 0.5rem;
		padding-block: 0.25rem;
		background-color: white;
		font-size: 1.2rem;
		border-bottom: 1px solid #ccc;
	}
	li button {
		width: 100%;
		text-align: left;
		border: none;
		color: black;
		background-color: transparent;
		font-weight: 200;
		font-size: 1.2rem;
		padding-inline: 1.5rem;
		padding-block: 0.5rem;
		cursor: pointer;
	}
	li button:hover {
		background-color: #ff7b00fd;
		color: white;
		border-radius: 0.5rem;
	}
</style>
