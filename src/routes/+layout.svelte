<script lang="ts">
	import type { Snippet } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Button from '$lib/components/Button.svelte';
	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();
</script>

<Header />
<main>
	{@render children()}
</main>

<style>
</style>
