<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
	import ButtonBlue from '$lib/components/ButtonBlue.svelte';
	import { goto } from '$app/navigation';

  let error: Error | null = null;
  let status: number = 500;
  function goHome() {
    goto('/');
  }
  onMount(() => {
    const unsubscribe = page.subscribe(($page) => {
      const pageData = $page as any; // Adjust type as necessary
      error = pageData.error ?? new Error('Unknown error');
      status = pageData.status ?? 500;
    });

    return () => {
      unsubscribe();
    };
  });
</script>

<main>
  {#if error}
    <h1>{status}</h1>
    <p>{error.message}</p>
  {:else}
    <p>No error</p>
  {/if}
  <ButtonBlue caption="Go back to the homepage" onClick={goHome} />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    background-color: #f8f9fa;
    color: #333;
  }

  h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }


</style>
