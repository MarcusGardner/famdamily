<script lang="ts">
    export let isOpen: boolean = true;
	export let title: string = '';
	export let closeButton: boolean = true;
	export let top: number = 7;
	export let left: number = 7;
	export let width: number = 300;
	export let height: number = 500;
	$: console.log('Popover reported: ', isOpen);
</script>

{#if isOpen}
	<div class="popover" style="top: {top}px; left: {left}px; width: {width}px; height: {height}px;">
		<div class="popover-header">
			<h2>{title}</h2>
			{#if closeButton}	
				<button
					on:click={() => isOpen = false}
					class="close-button"
					aria-label="Close popover"
					tabindex="0"><i class="fa-solid fa-xmark"></i></button
				>
			{/if}
		</div>
		<slot name='content'/>
	</div>  
{/if}


<style>
	.popover {
		position: absolute;
		background-color: transparent;
		border: 1px solid #f0efeffd;
		border-radius: 1rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
	}
	.popover-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: 600;
		padding-inline-end: 90px;
		padding-block-start: 0.1rem;
		padding-inline-start: 0.1rem;
		/* margin-block-end: .5rem; */
	}
	.close-button {
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		cursor: pointer;
		font-size: 1.5rem;
		height: 1rem;
		width: 1rem;
		color: rgb(0, 0, 0);
		border-radius: 50%;
		background-color: rgb(170, 0, 0);
	}
	button i {
		font-size: 1rem;
	}	
	h2 {
		font-size: 1.75rem;
		font-weight: 600;
	}

</style>
