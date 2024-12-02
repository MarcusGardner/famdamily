<script lang="ts">
	export let name: string = 'radio-group';
	export let options: string[] = [];
	export let selectedOption: string;
	export let onSelect: (value: string) => void;
	let index:number;


	function getOptionToIndex(option: string): number {
		if (option !== selectedOption) {
			let index = options.indexOf(option);
			console.log(`${name}: Option '${option}' has index '${index}'`);
			return index;
		} else {
			console.log(`${name}: Option '${option}' is already selected`);
			return -1;
		}
	}

</script>

<!-- /* From Uiverse.io by Yaya12085 */ -->
<div class="radio-inputs">
	{#each options as option}
		<label class="radio">
			<input
				type="radio"
				{name}
				checked={option === options[getOptionToIndex(option)]}
				on:change={() => onSelect(option)}
			/>
			<span class="name">{option}</span>
		</label>
	{/each}
</div>

<style>
	/* From Uiverse.io by Yaya12085 */
	.radio-inputs {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		border-radius: 1rem;
		background-color: #eee;
		box-sizing: border-box;
		box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
		padding: 0.25rem;
		width: 100%;
		font-size: 14px;
		margin-block: 0.5rem;
	}

	.radio-inputs .radio {
		flex: 1 1 auto;
		text-align: center;
	}

	.radio-inputs .radio input {
		display: none;
	}

	.radio-inputs .radio .name {
		display: flex;
		cursor: pointer;
		align-items: center;
		justify-content: center;
		border-radius: 1rem;
		border: none;
		padding: 0.5rem 0;
		color: rgba(51, 65, 85, 1);
		transition: all 0.15s ease-in-out;
	}

	.radio-inputs .radio input:checked + .name {
		background-color: #ff7300;
		font-weight: 600;
		color: #fff;
	}
</style>
