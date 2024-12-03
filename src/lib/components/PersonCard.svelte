<script lang="ts">
	import PersonCardInfo from './PersonCardInfo.svelte';

	export let person;
	export let isSelected = false;
	export let onEdit: () => void;
	export let onView: () => void;
	export let showView = true;
	export let swapSides = false;
	let expanded = false;
</script>
{#if person.first_name !== 'No'}
	<div class="person-header" style={isSelected ? 'border: 3px solid orange; background-color: white;' : ''}>
		<div class="header-title">
			{#if !swapSides}
				<button class="blue" aria-label="edit" on:click={onEdit}>
					<i class="fas fa-pencil-alt"></i>
				</button>
			{/if}
			<div class="name">
				<button class="blue" >
					<h3>{person.first_name} {person.last_name}</h3>
				</button>
			</div>
			{#if showView}
				<button class="blue" aria-label="view" on:click={onView}>
					<i class="fas fa-thumbtack"></i>
				</button>
			{/if}
			{#if swapSides}
				<button class="blue" aria-label="edit" on:click={onEdit}>
					<i class="fas fa-pencil-alt"></i>
				</button>
			{/if}
			<button class="blue" aria-label="expand/collaspe" on:click={() => (expanded = !expanded)}>
				{#if expanded}
					<i class="fas fa-chevron-up blue"></i>
				{:else}
					<i class="fas fa-chevron-down blue"></i>
				{/if}
			</button>
		</div>
	</div>
{/if}
{#if expanded}
	<div class="person-card">
		<div class="info">
			<PersonCardInfo label="First" value={person.first_name} />
			<PersonCardInfo label="Middle" value={person.middle_name} />
			<PersonCardInfo label="Last" value={person.last_name} />
			{#if person.sex === 'Female'}
				<PersonCardInfo label="Maiden" value={person.maiden_name} />
			{/if}
			<PersonCardInfo label="Alias" value={person.alias ? person.alias : person.first_name} />
			<PersonCardInfo label="Sex" value={person.sex} />
			<PersonCardInfo
				label="Born"
				value={person.born
					? typeof person.born === 'string'
						? person.born
						: person.born.toLocaleDateString()
					: 'Unknown'}
			/>
			<PersonCardInfo label="Location" value={person.born_where} />
			<PersonCardInfo
				label="Died"
				value={person.died
					? typeof person.died === 'string'
						? person.died
						: person.died.toLocaleDateString()
					: 'Unknown'}
			/>
			<PersonCardInfo label="Buried" value={person.died_where} />
		</div>
	</div>
{/if}

<style>
	.blue {
		color: #004f7cbe;
	}
	.person-header {
		background: rgb(234, 243, 255);
		border-radius: 0.5rem;
		width: 290px;
		border:none;
		border: 1px solid #27a9f5;
	}

	h3 {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding-block: 0.5rem;
		font-size: 1.2rem;
		font-weight: bold;
		color: #014d79be;
		height: 2.5rem;
	}

	.person-card {
		display: flex;
		gap: 0.5rem;
		margin-block-start: 0.5rem;
		padding: none;

		border-bottom-right-radius: 0.5rem;
		border-bottom-left-radius: 0.5rem;
		background-color: #ffffff;
	}
	.info {
		background: rgb(234, 243, 255);
		border: 2px solid #89d4ff;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
		width: calc(100% - 2rem);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		font-weight: lighter;
		border-radius: 1rem;
	}

	.header-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-inline: 1rem;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: .5rem;
	}

	i {
		font-size: 1.2rem;
		color: #004f7cbe;
		font-weight: bold;
	}
	i:hover {
		font-size: 1.5rem;
		color: #ff0000;
		text-shadow: 1px 1px 1px #363636;
	}
	.blue:hover {
		color: #1f1f1f;
		text-shadow: none;
	}
	h3:hover {
		font-size: 1.3rem;
		font-weight: 600;
		text-shadow: 1px 1px 1px #363636;
		text-shadow: 0px 0px 15px #00e1ff;
	}
	button {
		background-color: transparent;
		border: 0;
		border-radius: none;
		color: #fff;
		cursor: pointer;
		padding-block: 0;
		display: flex;
		font-family:
			system-ui,
			-apple-system,
			system-ui,
			'Segoe UI',
			Roboto,
			Ubuntu,
			'Helvetica Neue',
			sans-serif;
		font-size: 1rem;
		font-weight: 600;
		outline: 0;
		padding: 0;
		text-align: center;
		text-decoration: none;
		transition: all 0.3s;
		user-select: none;
		touch-action: manipulation;
	}

	button:before {
		background-color: initial;
		background-image: none;
		border-radius: 0;
		content: '';
		height:0;
		left: 0;
		opacity:1;
		position: absolute;
		top: 0;
		width: 0;
	}

	button:hover {
		box-shadow: none;
		-webkit-transform: scale(1.05);
		-ms-transform: scale(1.05);
		transform: scale(1.05);
	}
	.fas.fa-pencil-alt:hover {
		color: #181818;
		font-size: 1.3rem;
		text-shadow: none;
	}
</style>
