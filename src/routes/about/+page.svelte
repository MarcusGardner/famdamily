<script>
	import { onMount } from 'svelte';
	import { isLoading, loadPeopleFromDb } from '$lib/stores/personStore';
	import AppBrand from '$lib/components/AppBrand.svelte';
	import { fly, fade } from 'svelte/transition';

	onMount(async () => {
		isLoading.set(true);
		await loadPeopleFromDb();
		isLoading.set(false);
	});
</script>

{#if $isLoading}
	<div class="spinner">Loading...</div>
{:else}
	<div class="home-layout">
		<div class="column-1" in:fade={{ duration: 1000 }}>
			<AppBrand />
		</div>
		<div class="column-2">
			<div class="content-wrapper" in:fly={{ y: 50, duration: 1000 }}>
				<h1>About The Tree of Life</h1>
				
				<div class="card" in:fly={{ y: 50, duration: 1000, delay: 200 }}>
					<i class="fas fa-tree icon"></i>
					<p>Welcome to my passion project - a family tree application built with love and code.</p>
				</div>

				<div class="card" in:fly={{ x: 250, duration: 1000, delay: 400 }}>
					<i class="fas fa-lightbulb icon"></i>
					<p>Pro tip: Start by adding parents first! All relationships in the tree flow from child to parent.</p>
				</div>

				<div class="card" in:fly={{ y: 50, duration: 1000, delay: 600 }}>
					<i class="fas fa-code-branch icon"></i>
					<p>While I'm a professional developer, this is a labour of love created in my spare time. It may well have some quirks, but it's continuously evolving!</p>
				</div>
				
				<div class="card" in:fly={{ y: 50, duration: 1000, delay: 800 }}>
					<i class="fas fa-code icon"></i>
					<p>Crafted using modern web technologies: <span class="highlight">SvelteKit</span> and <span class="highlight">Supabase</span>.</p>
				</div>

				<div class="cta-card" in:fly={{ y: 50, duration: 1000, delay: 1000 }}>
					<i class="fas fa-comments icon"></i>
					<p>Got ideas to make it better? I'd love to hear from you!</p>
					<a href="/contact" class="cta-button">Get in Touch</a>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.content-wrapper {
		max-width: 800px;
		padding: 2rem;
		color: #ffffff;
	}

	h1 {
		font-size: 3rem;
		margin-bottom: 2rem;
		text-align: center;
		color: #ffffff;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}

	.card {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		padding: 1.5rem;
		border-radius: 1rem;
		margin-bottom: 1.5rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.card:hover {
		transform: translateY(-5px);
	}

	.icon {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		color: #ffd700;
	}

	.highlight {
		color: #ffd700;
		font-weight: bold;
	}

	.cta-card {
		background: rgba(255, 255, 255, 0.15);
		padding: 2rem;
		border-radius: 1rem;
		text-align: center;
		margin-top: 2rem;
	}

	.cta-button {
		display: inline-block;
		background: #ffd700;
		color: #2b5b77;
		padding: 0.8rem 1.5rem;
		border-radius: 2rem;
		margin-top: 1rem;
		text-decoration: none;
		font-weight: bold;
		transition: all 0.3s ease;
	}

	.cta-button:hover {
		background: #ffffff;
		transform: scale(1.05);
	}

	p {
		font-size: 1.1rem;
		line-height: 1.6;
		margin-bottom: 0.5rem;
	}

	/* Keep your existing layout styles */
	.home-layout {
		display: grid;
		grid-template-columns: 40vw 1fr;
	}

	.column-1 {
		width: 40vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: rgba(0, 52, 100, 0.822);
		background-color: #ffffff;
	}

	.column-2 {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #2b5b77;
		min-height: calc(100vh - 80px);
	}

	@media (max-width: 768px) {
		.home-layout {
			display: flex;
			flex-direction: column;
		}
		.column-2 {
			width: 100%;
		}
		.content-wrapper {
			padding: 1rem;
		}
		h1 {
			font-size: 2rem;
		}
	}

	@media (max-width: 1024px) {
		.home-layout {
			display: flex;
			flex-direction: column;
		}
		.column-1 {
			height: 70vh;
			width: 100%;
		}
		.column-2 {
			width: 100%;
		}
	}
</style>
