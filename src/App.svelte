<script>
	import { onMount } from "svelte";
	import { Route, Router, link } from "svelte-routing";
	import Home from "./Home.svelte"
	import Configuration from "./Configuration/Configuration.svelte";
	import Graphs from "./Graphs.svelte"

	// Show mobile icon and display menu
	let showMobileMenu = false;

	// List of navigation items
	const navItems = [
		{ label: "Configurations", href: "/CONFIG" },
		{ label: "Graphs", href: "/GRAPH" },
	];
	export let url = "";
</script>

<Router {url}>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<a class="navbar-brand" href="/">MMS</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarText"
				aria-controls="navbarText"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon" />
			</button>
			<div class="collapse navbar-collapse" id="navbarText">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					{#each navItems as item}
						<li class="nav-item">
							<a class="nav-link" href={item.href} use:link>{item.label}</a
							>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</nav>

	<div>
		<Route path="/">
			<Home />
		</Route>
		<Route path="CONFIG" let:params>
			<Configuration />
		</Route>
		<Route path="GRAPH" let:params>
			<Graphs />
		</Route>
	</div>
</Router>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
<style>

</style>
