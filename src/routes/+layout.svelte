<script lang="ts">
	import type { Snippet } from 'svelte';
	import Header from '$lib/components/Header.svelte';

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
	:root {
	--body-color: rgba(130, 79, 157, 30%);
  --button1-color: rgba(253, 170, 83, 30%);
  --buttontext-color: #411C5E;
  --ansbutton1-color: rgba(160, 198, 207, 80%);
  --ansbutton2-color: rgba(192, 155, 173, 90%);
  --ansbutton3-color: rgba(65, 28, 94, 30%);
  --ansbutton4-color: rgba(253, 170, 83, 50%);
	}
	:global body {
		margin: 0;
		padding: 0;
	}

	h1 {
		font-size: 55px;
	}
	h2 {
		font-size: 48px;
	}

	h3 {
		font-size: 40px;
	}
</style>
