<script>
</script>

<div class="layout">
	<div class="column-1">
		<div class="section-1">
			<img src="/images/logo.png" alt="Welcome" />
		</div>
		<div class="text">
            <h2>Welcome to the</h2>
            <h1>Tree of Life</h1>
            <p>Explore and manage your family lineage.</p>
		</div>
	</div>
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		width: 300px;
		height: 610px;
		background-color: transparent;
		border-radius: 1rem;
	}
	.column-1 {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width:300px;
		border-radius: 1rem;
	}
	.section-1 {
		width: 100%;
		background-color: transparent;
		border-radius: 1rem;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.text {
		padding-block: 3rem;
		text-align: center;
		width: 100%;
		height: 180px;
	}
	h1 {
		padding-block: 1rem;
		font-size: 3rem;
	}
	h2 {
		font-size: 2rem;
	}
	p {
		line-height: 1.3;
		padding-block: 0.5rem;
		padding-inline: 1rem;
		font-size: 1.5rem;
	}

	@media (max-width: 768px) {
		.column-1 {
			width: 100%;
		}
	}
</style>
