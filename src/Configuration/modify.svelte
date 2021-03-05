<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { modifySubmit } from "./configHandler";
    import { afterUpdate } from "svelte";

    export let SelectValue;
    console.log("recieved select value: ", SelectValue);
    export let allConfigs;
    let log, post, existingId, existingLog, existingPost;

    afterUpdate(() => {
        existingId = allConfigs[SelectValue].id;
        existingLog = allConfigs[SelectValue].log_interval;
        existingPost = allConfigs[SelectValue].data_post_api;
    });

    let logMultiplier = 1;

    let dispatch = createEventDispatcher();
    let setStatus = () => {
        dispatch("status", {
            status: "",
        });
    };

    function modifyHandler() {
        modifySubmit(existingId, log, post, logMultiplier);
    }

    let warningStaus: boolean = false;
    let warning = () => {
        warningStaus = true;
        console.log(existingId);
    };
    let deleteId: string;
    let deleteConfig = async () => {
        if (deleteId == existingId) {
            await fetch(
                `https://mmsdata.azurewebsites.net/api/MMSConfig?deleteID=${existingId}`
            );
            console.log(`deleted config : ${existingId}`);
        }
    };

</script>

<form on:submit|preventDefault={modifyHandler} style="margin: 20px">
    <h4 class="h4 text-center">Modify Config</h4>
    <div class="form-group text-center">
        <label for="config.id">Mac address</label>
        <p>{existingId}</p>
    </div>
    <div class="form-group text-center">
        <label for="config.log_interval">Log time</label>
        <input
            type="number"
            step="any"
            class="form-control text-center"
            placeholder={existingLog}
            bind:value={log}
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
        <label class="btn btn-secondary radio-margin" for="Hours">Hours </label>
    </div>
    <div class="form-group text-center">
        <label for="config.data_post_api">Api</label>
        <input
            type="text"
            class="form-control text-center"
            placeholder={existingPost}
            bind:value={post}
        />
    </div>
    <div class="text-center">
        <button type="submit" class="btn btn-primary btn-lg">Submit</button>
        <button class="btn btn-info btn-lg" on:click={setStatus}>Close</button>
    </div>
</form>
<div class="text-center" style="margin: 20px">
    <button class="btn btn-danger btn-lg" on:click={warning}
        >Remove Config</button
    >
</div>

{#if warningStaus}
    <div class="text-center" style="padding: 50px">
        <h4>
            Are you sure you want to remove {existingId}?
        </h4>
        <p>Enter the id to remove the configuration</p>
        <input type="text" bind:value={deleteId} />
        <button type="button" on:click={deleteConfig}>Delete</button>
    </div>
{/if}
