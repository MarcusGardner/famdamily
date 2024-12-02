<!-- src/lib/components/Modal.svelte -->
<script lang="ts">
	export let isVisible: boolean;
	export let close: () => void;

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
		}
	}

	function handleChildEvent(event: CustomEvent) {
		dispatch(event.type, event.detail); // Re-dispatch the event
	}
</script>

{#if isVisible}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="modal-backdrop" on:click={close} on:keydown={handleKeydown}>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="modal-frame" on:click|stopPropagation>
			<div class="header">
				<div class="header-text">
					<slot name="header"></slot>
				</div>
				<button class="close-button" aria-label='close' on:click={close}><i class="fas fa-times"></i></button>
			</div>
			<div class="modal-content">
				<slot></slot>
				<div class="footer">
					<slot name="footer"></slot>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.modal-frame {
		background-color: white;

		border-radius: 1rem;
		box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.9);
		position: relative;
	}
	.modal-content {
		padding-inline: 1rem;
        padding-block-start: 1rem;
	}
	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		font-size: 1.5rem;
		font-weight: bold;

	}
	.header-text {
		flex-grow: 1;
	}
	.close-button {
		position: absolute;
		border: 1px solid #ccc;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
		right: 0;
		top: 0;
        margin: 0.7rem;
		width: 2rem;
		height: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
        background-color: white;
	}
	.close-button:hover {
		background-color: transparent;
		color: white;
	}
	.footer {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
</style>
