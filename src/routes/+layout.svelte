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
	  :global body {
        font-size: 100%;
        margin: 5 auto;
        text-align: center;
        background-color: #e1d5e7;
        color: #411c5e;
    }
    h1 {
        font-size: 55px;
    }
    h2 {
        font-size: 48px;
    }
</style>
