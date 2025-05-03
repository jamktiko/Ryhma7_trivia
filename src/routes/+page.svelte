<script lang="ts">
	import { triviaManager } from '$lib/stores/triviaStore.svelte';
	import Pisteytys from '$lib/components/Pisteytys.svelte';
	import CategorySelector from '$lib/components/CategorySelector.svelte';
	import QuestionAnswer from '$lib/components/QuestionAnswer.svelte';

	//Funktio kategorian valintaan.
	//Hakee Triviamanagerin API fetchillä datan.
	async function categorySelect(categoryId: number) {
		await triviaManager.selectCategory(categoryId);
	}
</script>

{#if !triviaManager.isCategorySelected}
	<CategorySelector categorySelector={categorySelect} />
{:else}
	<QuestionAnswer />
{/if}

<!-- Tyylit kommentoitu pois, 
koska kategororiasta tehty oma komponentti 
ja tyylit ovat siellä. -->
<style>
	/* .container {
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
	} */
</style>
