<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import type { Snippet } from 'svelte';

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
		--buttontext-color: #411c5e;
		--ansbutton1-color: rgba(160, 198, 207, 80%);
		--ansbutton2-color: rgba(192, 155, 173, 90%);
		--ansbutton3-color: rgba(65, 28, 94, 30%);
		--ansbutton4-color: rgba(253, 170, 83, 50%);
	}
	main {
		width: 100%;
		height: 100%;
		font-size: 100%;
		text-align: center;
		background-color: var(--body-color);
		color: #411c5e;
	}
	h1 {
		font-size: 55px;
		font-family: 'Protest Strike';
	}
	h2 {
		font-size: 60px;
		font-family: 'Protest Strike';
	}

	h3 {
		font-size: 40px;
		font-family: 'KoHo';
	}
</style>
