<script lang="ts">
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

<div class="home-layout">
	<div class="column-1" in:fly={{ x: -50, duration: 1000 }}>
		<AppBrand />
	</div>
	<div class="column-2">
		{#if $isLoading}
			<div class="spinner">Loading...</div>
		{:else}
			<div class="content" in:fly={{ y: 50, duration: 1000 }}>
				<h1>Welcome</h1>
				<p class="tagline">Discover, Connect, and Preserve Your Family Legacy</p>
				
				<div class="features">
					<div class="feature" in:fly={{ y: 50, duration: 1000, delay: 200 }}>
						<i class="fas fa-tree feature-icon"></i>
						<h3>Build Your Tree</h3>
						<p>Create and explore your family connections with our intuitive tree builder</p>
					</div>
					
					<div class="feature" in:fly={{ y: 50, duration: 1000, delay: 400 }}>
						<i class="fas fa-heart feature-icon"></i>
						<h3>Share Stories</h3>
						<p>Preserve precious memories and stories for generations to come</p>
					</div>
					
					<div class="feature" in:fly={{ y: 50, duration: 1000, delay: 600 }}>
						<i class="fas fa-users feature-icon"></i>
						<h3>Connect Family</h3>
						<p>Bring your family together in one beautiful, shared space</p>
					</div>
				</div>

				<a href="/tree" class="cta-button" in:fade={{ delay: 800 }}>
					Start Your Journey
					<i class="fas fa-arrow-right"></i>
				</a>
			</div>
		{/if}
	</div>
</div>

<style>
	.home-layout {
		display: grid;
		grid-template-columns: 40vw 1fr;
		min-height: calc(100vh - 80px);
		background: linear-gradient(135deg, #2b5b77 0%, #1a3f54 100%);
	}

	.column-1 {
		width: 40vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, 0.95);
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
	}

	.column-2 {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.content {
		max-width: 800px;
		text-align: center;
	}

	h1 {
		font-size: 3.5rem;
		color: #ffffff;
		margin-bottom: 1rem;
		font-weight: 700;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
	}

	.tagline {
		font-size: 1.8rem;
		color: #e0e0e0;
		margin-bottom: 3rem;
	}

	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.feature {
		background: rgba(255, 255, 255, 0.1);
		padding: 2rem;
		border-radius: 1rem;
		backdrop-filter: blur(10px);
		transition: transform 0.3s ease;
	}

	.feature:hover {
		transform: translateY(-5px);
	}

	.feature-icon {
		font-size: 2.5rem;
		color: #ffd700;
		margin-bottom: 1rem;
	}

	.feature h3 {
		font-size: 1.5rem;
		color: #ffffff;
		margin-bottom: 1rem;
		font-weight: 600;
	}

	.feature p {
		color: #e0e0e0;
		line-height: 1.6;
		font-size: 1.1rem;
	}

	.cta-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: #ffd700;
		color: #2b5b77;
		padding: 1rem 2rem;
		border-radius: 2rem;
		font-size: 1.2rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
		background: #ffe44d;
	}

	@media (max-width: 1024px) {
		.home-layout {
			grid-template-columns: 1fr;
		}

		.column-1 {
			width: 100%;
			padding: 2rem;
		}

		.features {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 2.5rem;
		}

		.tagline {
			font-size: 1.4rem;
		}
	}
</style>
