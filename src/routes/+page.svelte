<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';
	import Pisteytys from '$lib/components/Pisteytys.svelte';
	import CategorySelector from '$lib/components/CategorySelector.svelte';

	let categorySelected: boolean = false;

	//Funktio kategorian valintaan.
	//Hakee Triviamanagerin API fetchillä datan.
	async function categorySelect(categoryId: number) {
		categorySelected = await triviaManager.selectCategory(categoryId);
	}
</script>

<!-- HTML tähän. Ei HTML tägiä, ei toimi Sveltessä -->

{#if !categorySelected}
	<div class="container">
		<h1>Welcome to MindSpark!</h1>
		<h2>Are you ready to test your knowledge?</h2>
	</div>

	{#if triviaManager.categories}
		<CategorySelector onCategorySelect={categorySelect} />
	{/if}
{/if}

<style>
	.container {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}

	h1 {
		font-size: 55px;
		font-family: 'Protest Strike';
		padding: 3px;
		margin: 0;
	}
	h2 {
		font-size: 48px;
		font-family: 'Protest Strike';
		padding: 5px;
		margin: 0;
	}

	h3 {
		font-size: 40px;
		font-family: 'KoHo';
		padding: 30px 0 5px 0;
		margin: 0;
	}

	@media only screen and (max-width: 655px) {
		h1 {
			font-size: 40px;
		}
		h2 {
			font-size: 32px;
		}
		h3 {
			font-size: 28px;
			padding: 10px 0 5px 0;
		}
	}

	@media only screen and (max-height: 745px) {
		h1 {
			font-size: 40px;
		}
		h2 {
			font-size: 32px;
		}
		h3 {
			font-size: 28px;
			padding: 10px 0 5px 0;
		}
	}
</style>
