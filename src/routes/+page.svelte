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
</style>
