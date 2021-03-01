<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { onMount } from "svelte";
	
	
	// import Configs from "./Configs.svelte";

	let allConfigs;
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

	let status: string;
	let statusNew = () => {
		status = "new";
	};
	let statusNone = () => {
		status = "";
	};
	let statusModify = () => {
		status = "modify";
	};
	let SelectValue = 0;
	let selectModify = (num) => () => (SelectValue = num);

	let warningStaus: boolean = false;
	let warning = () => {
		warningStaus = true;
		console.log(allConfigs[SelectValue].id);
	};
	let deleteId: string;
	let deleteConfig = async () => {
		if (deleteId == allConfigs[SelectValue].id) {
			// call to api to delete config
			await fetch(
				`https://mmsdata.azurewebsites.net/api/MMSConfig?deleteID=${allConfigs[SelectValue].id}`
			);
			console.log(`deleted config : ${allConfigs[SelectValue].id}`);
		}
	};

	let dispatch = createEventDispatcher();
	let logMultiplier = 1;
	let upsertConfig: string = `https://mmsdata.azurewebsites.net/api/MMSConfigUpsert`;
	
	
	let config = {
		id: "",
		log_interval: 0,
		data_post_api: "",
	};

	const submitHandler = () => {
		console.log(config);
		config.log_interval = config.log_interval * logMultiplier;
		dispatch("add");
		const options = {
			method: "POST",
			body: JSON.stringify(config),
			headers: { "Content-Type": "application/json" },
		};

		fetch(upsertConfig, options)
			.then((res) => res.json())
			.then((res) => console.log(res));
	};

	const modifyHandler = () => {
		config.id = allConfigs[SelectValue].id;
		config.log_interval = config.log_interval * logMultiplier;
		console.log(config);
		dispatch("add");
		const options = {
			method: "POST",
			body: JSON.stringify(config),
			headers: { "Content-Type": "application/json" },
		};

		fetch(upsertConfig, options)
			.then((res) => res.json())
			.then((res) => console.log(res));
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
								on:click={statusModify}
								on:click={selectModify(i)}>Modify</button
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
	<form on:submit={submitHandler} style="margin: 20px;">
		<h4 class="h4 text-center">Create Config</h4>
		<div class="form-group text-center">
			<label for="config.id">Mac address</label>
			<input
				type="text"
				class="form-control text-center"
				placeholder="00:00:00:00:00:00"
				bind:value={config.id}
			/>
		</div>
		<div class="form-group text-center">
			<label for="config.log_interval">Log time</label>
			<input
				type="number"
				step="any"
				class="form-control text-center"
				placeholder="10000"
				bind:value={config.log_interval}
				min="0"
			/>
			<input
				type="radio"
				class="btn-check"
				id="Milliseconds"
				name="logTime"
				autocomplete="off"
				checked
				bind:group={logMultiplier}
				value={1}
			/>
			<label class="btn btn-secondary radio-margin" for="Milliseconds"
				>Milliseconds</label
			>
	
			<input
				type="radio"
				class="btn-check"
				id="Seconds"
				name="logTime"
				autocomplete="off"
				bind:group={logMultiplier}
				value={1000}
			/>
			<label class="btn btn-secondary radio-margin" for="Seconds"
				>Seconds
			</label>
	
			<input
				type="radio"
				class="btn-check"
				id="Minutes"
				name="logTime"
				autocomplete="off"
				bind:group={logMultiplier}
				value={60000}
			/>
			<label class="btn btn-secondary radio-margin" for="Minutes"
				>Minutes
			</label>
			<input
				type="radio"
				class="btn-check"
				id="Hours"
				name="logTime"
				autocomplete="off"
				bind:group={logMultiplier}
				value={3600000}
			/>
			<label class="btn btn-secondary radio-margin" for="Hours">Hours </label>
		</div>
		<div class="form-group text-center">
			<label for="config.data_post_api">Api</label>
			<input
				type="text"
				class="form-control text-center"
				placeholder="Api to post config to"
				bind:value={config.data_post_api}
			/>
		</div>
		<div class="text-center">
			<button type="submit" class="btn btn-primary btn-lg">Submit</button>
			<button class="btn btn-info btn-lg" on:click={statusNone}
			>Close</button
		>
		</div>
	</form>
	{/if}

	{#if status == "modify"}
		<form on:submit|preventDefault={modifyHandler} style="margin: 20px">
			<h4 class="h4 text-center">Modify Config</h4>
			<div class="form-group text-center">
				<label for="config.id">Mac address</label>
				<p>{allConfigs[SelectValue].id}</p>
			</div>
			<div class="form-group text-center">
				<label for="config.log_interval">Log time</label>
				<input
					type="number"
					step="any"
					class="form-control text-center"
					placeholder={allConfigs[SelectValue].log_interval}
					bind:value={config.log_interval}
					min=""
				/>
				<input
					type="radio"
					class="btn-check"
					id="Milliseconds"
					name="logTime"
					autocomplete="off"
					checked
					bind:group={logMultiplier}
					value={1}
				/>
				<label class="btn btn-secondary radio-margin" for="Milliseconds"
					>Milliseconds</label
				>

				<input
					type="radio"
					class="btn-check"
					id="Seconds"
					name="logTime"
					autocomplete="off"
					bind:group={logMultiplier}
					value={1000}
				/>
				<label class="btn btn-secondary radio-margin" for="Seconds"
					>Seconds
				</label>

				<input
					type="radio"
					class="btn-check"
					id="Minutes"
					name="logTime"
					autocomplete="off"
					bind:group={logMultiplier}
					value={60000}
				/>
				<label class="btn btn-secondary radio-margin" for="Minutes"
					>Minutes
				</label>
				<input
					type="radio"
					class="btn-check"
					id="Hours"
					name="logTime"
					autocomplete="off"
					bind:group={logMultiplier}
					value={3600000}
				/>
				<label class="btn btn-secondary radio-margin" for="Hours"
					>Hours
				</label>
			</div>
			<div class="form-group text-center">
				<label for="config.data_post_api">Api</label>
				<input
					type="text"
					class="form-control text-center"
					placeholder={allConfigs[SelectValue].data_post_api}
					bind:value={config.data_post_api}
				/>
			</div>
			<div class="text-center">
				<button type="submit" class="btn btn-primary btn-lg"
					>Submit</button
				>
				<button class="btn btn-info btn-lg" on:click={statusNone}
					>Close</button
				>
			</div>
		</form>
		<div class="text-center" style="margin: 20px">
			<button class="btn btn-danger btn-lg" on:click={warning}
				>Remove Config</button
			>
		</div>
	{/if}
	{#if warningStaus && status == "modify"}
		<div class="text-center" style="padding: 50px">
			<h4>
				Are you sure you want to remove {allConfigs[SelectValue].id}?
			</h4>
			<p>Enter the id to remove the configuration</p>
			<input type="text" bind:value={deleteId} />
			<button type="button" on:click={deleteConfig}>Delete</button>
		</div>
	{/if}
</main>
<link
	rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
/>

<!-- https://mmsdata.azurewebsites.net/api/MMS_Post? -->
<style>
	.radio-margin {
		margin: 10px 5px 10px 5px;
	}
</style>

<!--  -->
