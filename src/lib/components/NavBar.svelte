<script lang="ts">
	import { page } from '$app/stores';
	import { authStore, isAuthenticated } from '$lib/stores/authStore';
	import { goto } from '$app/navigation';

	let showMenu = false;

	function toggleMenu() {
		showMenu = !showMenu;
	}

	function closeMenu() {
		showMenu = false;
	}

	async function handleLogout() {
		await authStore.signOut();
		goto('/');
	}
</script>

<nav>
	<!-- Brand/Site Name -->
	<p class="brand">
		<i class="fas fa-leaf"></i>
		&nbsp;Tree of Life
	</p>
	<button class="hamburger" on:click={toggleMenu}> ☰ </button>
	
	<!-- Desktop Menu -->
	<div class="menu">
		<a href="/" class="menu-item {$page.url.pathname === '/' ? 'active' : ''}">
			<i class="fas fa-home"></i>
			Home
		</a>
		
		{#if $isAuthenticated}
			<a href="/tree" 
			   class="menu-item {$page.url.pathname === '/tree' ? ' active' : ''}"
			   on:click={closeMenu}>
				<i class="fas fa-tree"></i>
				Tree
			</a>
		{/if}
		
		<a href="/about" class="menu-item {$page.url.pathname === '/about' ? 'active' : ''}">
			<i class="fas fa-info-circle"></i>
			About
		</a>
		<a href="/contact" class="menu-item {$page.url.pathname === '/contact' ? 'active' : ''}">
			<i class="fas fa-envelope"></i>
			Contact
		</a>

		{#if $isAuthenticated}
			<a href="/" 
			   class="menu-item {$page.url.pathname === '/logout' ? 'active' : ''}"
			   on:click|preventDefault={handleLogout}>
				<i class="fas fa-sign-out-alt"></i>
				Logout
			</a>
		{:else}
			<a href="/login" class="menu-item {$page.url.pathname === '/login' ? 'active' : ''}">
				<i class="fas fa-sign-in-alt"></i>
				Login
			</a>
		{/if}
	</div>

	<!-- Mobile Menu -->
	{#if showMenu}
		<div class="popup-menu">
			<a href="/" 
			   class="menu-item {$page.url.pathname === '/' ? 'active' : 'a-small'}"
			   on:click={closeMenu}>
				<i class="fas fa-home"></i>
				Home
			</a>

			{#if $isAuthenticated}
				<a href="/tree"
				   class="menu-item {$page.url.pathname === '/tree' ? ' active' : 'a-small'}"
				   on:click={closeMenu}>
					<i class="fas fa-tree"></i>
					Tree
				</a>
			{/if}

			<a href="/about"
			   class="menu-item {$page.url.pathname === '/about' ? 'active' : 'a-small'}"
			   on:click={closeMenu}>
				<i class="fas fa-info-circle"></i>
				About
			</a>
			<a href="/contact"
			   class="menu-item {$page.url.pathname === '/contact' ? 'active' : 'a-small'}"
			   on:click={closeMenu}>
				<i class="fas fa-envelope"></i>
				Contact
			</a>

			{#if $isAuthenticated}
				<a href="/" 
				   class="menu-item {$page.url.pathname === '/logout' ? 'active' : 'a-small'}"
				   on:click|preventDefault={handleLogout}>
					<i class="fas fa-sign-out-alt"></i>
					Logout
				</a>
			{:else}
				<a href="/login" 
				   class="menu-item {$page.url.pathname === '/login' ? 'active' : 'a-small'}"
				   on:click={closeMenu}>
					<i class="fas fa-sign-in-alt"></i>
					Login
				</a>
			{/if}
		</div>
	{/if}
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 1rem;

		box-sizing: border-box; /* Ensure padding is included in the width */
		background-color: #03365fb6;
		height: 65px;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
	}

	.brand {
		font-size: 2rem;
		color: #fff;
		text-decoration: none;
		font-weight: medium;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
	}

	.hamburger {
		display: none;
	}

	.menu {
		display: flex;
		gap: 0.5rem;
	}
	.menu a {
		width: 50px;
		text-decoration: none;
	}
	.menu a:hover {
		background-color: #ffee00b7;
	}

	.menu-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-decoration: none;
		color: #fff;
		background-color: transparent;
		border: none;
		box-shadow: none;
		position: relative;
        padding-inline: 1rem;
        padding-block: 0.5rem;
	}

	.menu-item i {
		font-size: 1.5rem;
		margin-bottom: 0.25rem;
	}

	.active {
		background-color: #ff7b00;
		border: none;
		border-radius: 0;
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
	}

	.a-small {
		background-color: transparent;
		border: none;
		text-align: center;
		padding: 1rem;
		padding-inline: 3rem;
		font-size: 1.5rem;
		width: 90%;
		border: none;
		box-shadow: none;
	}
	.a-small:hover {
		width: 90%;
	}
	.popup-menu {
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		justify-content: center;
		align-items: center;
		z-index: 1000;
		overflow-y: auto; /* Ensure scrolling if content overflows */
	}

	.popup-menu a {
		color: #fff;
		font-size: 1.5rem;
		margin: 1rem 0;
		text-align: center;
	}




	@media (max-width: 790px) {
		.menu {
			display: none;
		}

		.hamburger {
			display: block;
			border: none;
			font-size: 1.45em;
			width: 100px;
			height: 50px;
			background: none;
			color: #fff;
			cursor: pointer;
			border-radius: 1rem;
		}

		.popup-menu {
			display: flex;
			flex-direction: column;
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background-color: rgba(0, 0, 0, 0.8);
			justify-content: center;
			align-items: center;
			z-index: 1000;
		}

		.popup-menu a {
			color: #fff;
			font-size: 1.5rem;
			margin: 1rem 0;
		}
	}
</style>
