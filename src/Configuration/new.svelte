<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { newSubmit } from "./configHandler";
    let id, log, post;

    let dispatch = createEventDispatcher();
    let logMultiplier = 1;
    let setStatus = () => {
        dispatch("status", {
            status: "",
        });
    };
    function submit() {
        newSubmit(id, log, post, logMultiplier);
    }
</script>

<form on:submit|preventDefault={submit} style="margin: 20px;">
    <h4 class="h4 text-center">Create Config</h4>
    <div class="form-group text-center">
        <label for="config.id">Mac address</label>
        <input
            type="text"
            class="form-control text-center"
            placeholder="00:00:00:00:00:00"
            bind:value={id}
        />
    </div>
    <div class="form-group text-center">
        <label for="config.log_interval">Log time</label>
        <input
            type="number"
            step="any"
            class="form-control text-center"
            placeholder="10000"
            bind:value={log}
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
            bind:value={post}
        />
    </div>
    <div class="text-center">
        <button type="submit" class="btn btn-primary btn-lg">Submit</button>
        <button class="btn btn-info btn-lg" on:click={setStatus}>Close</button>
    </div>
    
</form>

<style>
    .radio-margin {
        margin: 10px 5px 10px 5px;
    }
</style>
