<script lang="ts">
	import type { PageProps } from './$types';

	// Runes mode: page data arrives as a prop via $props() instead of `export let`
	let { data }: PageProps = $props();
</script>

<ul>
	<!-- (country.id) is the each-block key so Svelte can track rows when the list changes -->
	{#each data.countries as country (country.id)}
		<li>{country.name}</li>
	{/each}
</ul>
