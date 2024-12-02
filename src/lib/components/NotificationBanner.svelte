<!-- src/lib/components/NotificationBanner.svelte -->
<script lang="ts">
  export let message: string = '';
  export let type: string;          //'error' | 'success' = 'error'; // Ensure these props are declared

  let isVisible = false;

  // Show the notification for a few seconds
  $: if (message) {
    isVisible = true;
    setTimeout(() => (isVisible = false), 5000);
  }
</script>

{#if isVisible}
  <div class="notification {type}">
    <p>{message}</p>
  </div>
{/if}

<style>
  .notification {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    color: #fff;
    font-weight: bold;
    z-index: 1000;
  }

  .error {
    background-color: #e74c3c;
  }

  .success {
    background-color: #2ecc71;
  }
</style>
