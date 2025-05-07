<script lang="ts">
	import { triviaManager } from '$lib/stores/triviaStore.svelte';
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
	<!-- Näytetään ajastin ja kysymys-vastauskomponentti, kun kategoria on valittu -->

	<QuestionAnswer />
{/if}

<style>
</style>
