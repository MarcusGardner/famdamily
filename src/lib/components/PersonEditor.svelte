<script lang="ts">
  import type { IPerson } from '../data/appModel';

  export let currentPerson: IPerson
  export let initiatorType: string;

  let options: string[] = [];

  $: {
    if (initiatorType === 'parent') {
      options = ['Link an Existing Child', 'Add a New Child', 'Add a New Person'];
    } else if (initiatorType === 'selectedPerson') {
      options = ['Link to an Existing Partner', 'Link to Existing Parents', 'Add a New Partner', 'Add a New Person'];
    } else if (initiatorType === 'partner') {
      options = ['Link an Existing Child', 'Add a New Child', 'Add a New Person'];
    }
  }
</script>

<div class="person-editor">
  <h2>Editing {currentPerson.fullname}</h2>
  <ul>
    {#each options as option}
      <li>{option}</li>
    {/each}
  </ul>
</div>

<style>
  /* Add styles for person editor */

</style>
