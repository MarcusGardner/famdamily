<script lang="ts">
	import PersonSearchPopover from './PersonSearchPopover.svelte';
	import type { IPerson } from '../data/appModel';

	let {personType = $bindable('Person'), selectedPerson = $bindable(null), personSelected} = $props();
	let showSearchPopover = $state(false);

	function togglePopover() {
		showSearchPopover = !showSearchPopover;
	}


	function handlePersonSelected(e: CustomEvent<IPerson>) {
		selectedPerson = e.detail;
		showSearchPopover = false;
		personSelected();
	}
    let screenWidth = $derived(window.innerWidth);
</script>

<button 
	type="button"
	class="person-picker" 
>   
	<div class="search-icon" 
        onclick={togglePopover} 
        role="button" 
        onkeydown={togglePopover} 
        tabindex="0"
    >
		<i class="fas fa-search"></i>
	</div>
	<div class="caption" 
        onclick={togglePopover} 
        role="button" 
        onkeydown={togglePopover} 
        tabindex="0"
    >
		{selectedPerson
			? `${selectedPerson.first_name} ${selectedPerson.last_name}`
			: `Select a ${personType}`}
	</div>

	{#if selectedPerson}
		<div class="close-button">
			<i class="fas fa-close" 
                onclick={() => selectedPerson = null} 
                role="button" 
                onkeydown={() => selectedPerson = null} 
                tabindex="0"
            ></i>
		</div>
	{/if}
</button>

{#if showSearchPopover}
	<PersonSearchPopover 
        isVisible={showSearchPopover} 
        on:personSelected={handlePersonSelected}
        on:close={() => showSearchPopover = false} 
    />
{/if}

<style>
    .person-picker {
        width: 100%;
        padding: 0.5rem 1rem;
        border-radius: 1.5rem;
        border: 1px solid #7e7d7d;
        
        background-color: rgb(247, 247, 247);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
        cursor: pointer;
    }

    button {
        color: #004f7cbe;
        display: flex;
        align-items: center;
        font-size: 1rem;
        font-weight: 600;
    }
    i {
        cursor: pointer;
    }
    .search-icon {
        justify-self: flex-start;
    }
    .caption {
        margin-left: 0.5rem;
    }
    .close-button {
        margin-left: auto;
        color: #850303;
    }

</style>
