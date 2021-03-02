<script lang="ts">
    //import  { statusNone }  from "./Configuration.svelte";
    import { createEventDispatcher } from "svelte";
    import Configuration from "./Configuration.svelte";
    export let allConfigs;
    export let logMultiplier;
    export let SelectValue;
    export let status;
    export let upsertConfig;
    let config;
    let dispatch = createEventDispatcher();
    
    function statusNone() {
		status = "";
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
    let warningStaus: boolean = false;
    let warning = () => {
        warningStaus = true;
        console.log(allConfigs[SelectValue].id);
    };
    export let deleteId: string;
    let deleteConfig = async () => {
        if (deleteId == allConfigs[SelectValue].id) {
            // call to api to delete config
            await fetch(
                `https://mmsdata.azurewebsites.net/api/MMSConfig?deleteID=${allConfigs[SelectValue].id}`
            );
            console.log(`deleted config : ${allConfigs[SelectValue].id}`);
        }
    };
</script>

<main>
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
            <button type="submit" class="btn btn-primary btn-lg">Submit</button>
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
