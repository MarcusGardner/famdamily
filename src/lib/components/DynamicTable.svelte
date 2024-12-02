<script lang="ts">
    import { camelCaseToTitleCase } from '$lib/utils/strUtils';

	export let retrieveAll: () => Promise<any[]>;
	export let model: any;

	let data: any[] = [];
	let sortedData: any[] = [];
	let searchValue: string = '';
	let currentSortColumn: string | null = null;
	let currentSortState: 'asc' | 'desc' | 'none' = 'none';

	// Fetch data when the component is initialized
	retrieveAll().then(fetchedData => {
		data = fetchedData;
		sortedData = [...data];
	});

	function sortData(column: string) {
		if (currentSortColumn === column) {
			currentSortState =
				currentSortState === 'none' ? 'asc' : currentSortState === 'asc' ? 'desc' : 'none';
		} else {
			currentSortColumn = column;
			currentSortState = 'asc';
		}

		if (currentSortState === 'none') {
			sortedData = [...data];
		} else {
			sortedData = [...data].sort((a, b) => {
				const aValue = a[column] || '';
				const bValue = b[column] || '';
				return currentSortState === 'asc'
					? aValue.toString().localeCompare(bValue.toString())
					: bValue.toString().localeCompare(aValue.toString());
			});
		}
	}

	let filteredData: any[] = []; // Declare filteredData

	$: {
		filteredData = sortedData.filter((item) =>
			Object.values(item).some((value) =>
				value?.toString().toLowerCase().includes(searchValue.toLowerCase())
			)
		);
	}
</script>

<div class="table-container">
	<input type="text" placeholder="Search..." bind:value={searchValue} />

	<table>
			<thead>
				<tr>
					{#each Object.keys(new model({})) as column}
						{#if column !== 'id' && column !== 'created_by' && column !== 'created_at' && column !== 'last_edited_by' && column !== 'last_edited_at'}
							<th on:click={() => sortData(column)}>
								{camelCaseToTitleCase(column)}
								<span class="sort-icon">
									{currentSortColumn === column
										? currentSortState === 'asc'
											? '▼'
											: currentSortState === 'desc'
												? '▲'
												: '⇅'
										: '⇅'}
								</span>
							</th>
						{/if}
					{/each}
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredData as item}
					<tr>
						{#each Object.keys(new model({})) as column}
							{#if column !== 'id' && column !== 'created_by' && column !== 'created_at' && column !== 'last_edited_by' && column !== 'last_edited_at'}
								<td>{item[column] || '-'}</td>
							{/if}
						{/each}
						<td class="column-edit">
							<button
								on:click={() => {
									/* Open modal for editing */
								}}
							>
								<i class="fas fa-edit"></i>
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<td colspan={Object.keys(new model({})).length + 1}>Total Rows: {filteredData.length}</td>
				</tr>
			</tfoot>
		</table>
	</div>

	<style>
		.column-edit {
			width: 3rem;
			text-align: center;
		}
		input {
			margin-bottom: 1rem;
			padding-inline: .8rem;
			padding-block: 0.5rem;
			margin-inline-start: 1rem;
			border-radius: .5rem;
			border: 1px solid #cacaca;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
		}
		input:focus {
			outline: 2px solid #5693cc;
		}
		td button {
			background-color: transparent;
			border: none;
			box-shadow: none;
			padding: .15rem;
			margin:auto
		}
		td button:hover {
			background-color: #68bbff;
		}
		
		table {
			width: 100%;
			border-collapse: collapse;
		}
		th,
		td {
			border: none;
			padding: 8px;
			text-align: left;
		}
		th {
			cursor: pointer;
			background-color: #032c38c5;
			color: white;
			font-size: 1rem;
			
		}
		.sort-icon {
			margin-left: 5px;
			font-size: 0.8rem;
		}
		tbody {
			color: #333;
		}
		tbody tr:nth-child(even) {
			background-color: #f2f2f2;
		}
		tbody tr:nth-child(odd) {
			background-color: #ffffff;
		}
		th:first-child {
			border-top-left-radius: .5rem;
		}
		th:last-child {
			border-top-right-radius: .5rem;
		}
		tr {
			border-bottom: 1px solid #cacaca;
		}
		td:first-child {
			padding-left: 1rem;
			border-inline-start: 1px solid #cacaca;
		}
		td:last-child {
			border-inline-end: 1px solid #cacaca;
		}
		tfoot td {
			background-color: #032c38c5;
			color: white;
			text-align: center;
			padding: 10px;
		}
		tfoot td:first-child {
			border-bottom-left-radius: .5rem;
		}
		tfoot td:last-child {
			border-bottom-right-radius: .5rem;
		}
	</style>
