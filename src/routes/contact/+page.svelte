<!-- src/routes/index.svelte (Home Page) -->
<script lang="ts">
	import AppBrand from '$lib/components/AppBrand.svelte';
	import { fly, fade } from 'svelte/transition';
</script>

<div class="home-layout">
	<div class="column-1" in:fly={{ x: -50, duration: 1000 }}>
		<AppBrand />
	</div>
	<div class="column-2">
		<div class="content" in:fly={{ y: 50, duration: 1000 }}>
			<h1>Let's Connect</h1>
			<p class="tagline">I'd love to hear from you</p>

			<div class="contact-cards">
				<div class="card email" in:fly={{ y: 50, duration: 1000, delay: 200 }}>
					<div class="icon-wrapper">
						<i class="fas fa-envelope"></i>
					</div>
					<h2>Email Me</h2>
					<a href="mailto:marcus@v-sys.co.nz?subject=Inquiry/Comment/Suggestion&body=Hello%20there!"
						>marcus@v-sys.co.nz</a
					>
					<p>Comments, critiques, and suggestions welcomed</p>
				</div>

				<div class="card website" in:fly={{ y: 50, duration: 1000, delay: 400 }}>
					<div class="icon-wrapper">
						<i class="fas fa-globe"></i>
					</div>
					<h2>Visit Me Online</h2>
					<a href="https://www.v-sys.co.nz" target="_blank" rel="noopener noreferrer">v-sys.co.nz</a>
					<p>Explore more of our services</p>
				</div>

				<div class="card location" in:fly={{ y: 50, duration: 1000, delay: 600 }}>
					<div class="icon-wrapper">
						<i class="fas fa-map-marker-alt"></i>
					</div>
					<h2>Find Me</h2>
					<p>Nelson, New Zealand</p>
					<p>The sunniest region in beautiful Aotearoa</p>
				</div>
			</div>

			<div class="map-container" in:fade={{ delay: 800 }}>
				<iframe
					title="Where to find us"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086065678678!2d173.2510994!3d-41.3027606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d3becca66b9c1eb%3A0x5f664b802f2f1bc8!2s81A%20Scotia%20Street%2C%20Wakatu%2C%20Nelson%207011!5e0!3m2!1sen!2snz!4v1698765432100!5m2!1sen!2snz"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</div>
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
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, 0.95);
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
	}

	.column-2 {
		padding: 2rem;
		color: white;
	}

	.content {
		max-width: 1200px;
		margin: 0 auto;
		text-align: center;
	}

	h1 {
		font-size: 3.5rem;
		margin-bottom: 0.5rem;
		font-weight: 700;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
	}

	.tagline {
		font-size: 1.8rem;
		color: #e0e0e0;
		margin-bottom: 3rem;
	}

	.contact-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.card {
		background: rgba(255, 255, 255, 0.1);
		padding: 2rem;
		border-radius: 1rem;
		backdrop-filter: blur(10px);
		transition: transform 0.3s ease;
	}

	.card:hover {
		transform: translateY(-5px);
	}

	.icon-wrapper {
		width: 60px;
		height: 60px;
		background: #ffd700;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 1.5rem;
	}

	.icon-wrapper i {
		font-size: 1.8rem;
		color: #2b5b77;
	}

	.card h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		font-weight: 600;
	}

	.card p {
		color: #e0e0e0;
		line-height: 1.6;
		margin-bottom: 0.5rem;
	}

	.card a {
		color: #ffd700;
		text-decoration: none;
		font-size: 1.2rem;
		display: inline-block;
		margin-bottom: 1rem;
		transition: color 0.3s ease;
	}

	.card a:hover {
		color: #ffe44d;
	}

	.map-container {
		width: 100%;
		height: 320px;
		border-radius: 1rem;
		overflow: hidden;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	}

	iframe {
		width: 100%;
		height: 100%;
		border: none;
	}

	@media (max-width: 1024px) {
		.home-layout {
			grid-template-columns: 1fr;
		}

		.column-1 {
			padding: 2rem;
		}

		.contact-cards {
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

		.map-container {
			height: 300px;
		}
	}
</style>
