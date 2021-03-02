<script lang="ts">
    import Configuration from "./Configuration.svelte";
    import { createEventDispatcher } from "svelte";
    let config;
    let dispatch = createEventDispatcher();
    export let logMultiplier;
    export let upsertConfig;
    export let status;
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

    function statusNone() {
        status = "";
    }
</script>

<main>
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
            <label class="btn btn-secondary radio-margin" for="Hours"
                >Hours
            </label>
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
</main>

<style>
    .radio-margin {
        margin: 10px 5px 10px 5px;
    }
</style>
