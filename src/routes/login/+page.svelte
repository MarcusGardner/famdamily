<script lang="ts">
	import { authStore } from '$lib/stores/authStore';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let email = '';
	let password = '';
	let error = '';
	let showPassword = false;

	async function handleLogin() {
		try {
			error = '';
			await authStore.signIn(email, password);
			const redirectTo = $page.url.searchParams.get('redirectTo') || '/';
			goto(redirectTo);
		} catch (e: any) {
			if (e.status === 400) {
				error = 'Invalid email or password';
			} else {
				error = 'An error occurred during login. Please try again.';
			}
			console.error('Login error:', e);
		}
	}
</script>

<div class="login-container">
	<h1><i class="fas fa-key gold"></i> Login</h1>

	<form onsubmit={handleLogin}>
		<div class="field">
			<label for="email">Email</label>
			<button
				class="password-btn"
				type="button"
				onclick={() => (showPassword = !showPassword)}
				aria-label="Toggle password visibility"
			>
				<i class="fas fa-envelope"></i>
			</button>
			<input type="email" id="email" bind:value={email} required />
		</div>

		<div class="field">
			<label for="password">Password</label>
			<button
				class="password-btn"
				type="button"
				onclick={() => (showPassword = !showPassword)}
				aria-label="Toggle password visibility"
			>
				<i class={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
			</button>
			<input
				type={showPassword ? 'text' : 'password'}
				id="password"
				bind:value={password}
				required
			/>
		</div>

		{#if error}
			<div class="error">{error}</div>
		{/if}
		<div class="button-container">
			<button type="submit">Login</button>
		</div>
	</form>
</div>

<style>
    .gold {
        color: #ffd000;
    }
	.login-container {
		max-width: 300px;
		margin: 6rem auto;
		padding: 1rem 2rem;
		border-radius: 8px;
		background: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.field {
		display: grid;
		grid-template-columns: 70px 50px 160px;
        align-items: center;
        margin-block: 1rem;
	}
	label {
		margin-inline-end: 0.25rem;
	}
	input {
		width: 100%;
		padding-inline-start: 1rem;
		padding-block: 0.5rem;
		border-radius: 4px;
		border: 1px solid #ccc;
		margin-inline-start: 0.25rem;
	}

	.error {
		color: red;
		margin-bottom: 1rem;
	}
	h1 {
		margin-bottom: 1.5rem;
	}
	.button-container {
		display: flex;
		justify-content: flex-end;
	}
	button {
		padding-inline: 2rem;
		box-shadow: 3px 3px 3px #141414c2;
		cursor: pointer;
	}

	button i {
		font-size: 1.2rem;
	}
	button:focus,
	input:focus {
		outline: 2px solid #ffd000; /* Blue outline for focus */
		outline-offset: 2px;
	}
	.password-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		padding-inline: 0.5rem;
		margin: 0;
		color: #141414c2;
		box-shadow: none;
	}
</style>
