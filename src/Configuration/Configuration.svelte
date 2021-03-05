<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { onMount } from "svelte";
	import Modify from "./modify.svelte";
	import New from "./new.svelte";
	

	let allConfigs;
	let status: string;
	let SelectValue = 0;
	let selectModify = (num) => () => (SelectValue = num);

	console.log("select value: ", SelectValue);

	onMount(async () => {
		await fetch(
			"https://mmsdata.azurewebsites.net/api/MMSConfig?motorID=all"
		)
			.then((res) => res.json())
			.then((data) => {
				allConfigs = data;
			});
		console.log(allConfigs);
	});
	let changeStatus = (event) => {
		status = event.detail.status;
	};
	let statusNew = () => {
		status = "new";
	};

	let statusModify = () => {
		status = "modify";
	};
</script>

<main>
	<h1 class="h1 text-center">Hello!</h1>

	{#if allConfigs}
		<table class="table table-striped table-hover" style="padding: 100px;">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">MAC address</th>
					<th scope="col">Log interval</th>
					<th scope="col">Post Api</th>
					<th scope="col" />
				</tr>
			</thead>
			<tbody>
				{#each allConfigs as { id, log_interval, data_post_api }, i}
					<tr>
						<th scope="row">{i + 1}</th>
						<td>{id}</td>
						<td>{log_interval}</td>
						<td>{data_post_api}</td>
						<td>
							<button
								type="button"
								class="btn btn-primary"
								on:click={selectModify(i)}
								on:click={statusModify}
								>Modify</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<div class="text-center">
			<button
				type="button"
				class="btn btn-primary btn-lg"
				data-toggle="modal"
				data-target="newModal"
				on:click={statusNew}>Add new</button
			>
		</div>
	{:else}
		<p>loading...</p>
	{/if}

	{#if status == "new"}
		<New on:status={changeStatus} />
	{/if}

	{#if status == "modify"}
		<Modify {SelectValue} {allConfigs} on:status={changeStatus} />
	{/if}
</main>
<link
	rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
/>
