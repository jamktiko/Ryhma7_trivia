<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';

	let kategoriaValittu: boolean = false;
	let nykyinenKysymys: number = 0;
	let arvotutVastaukset: string[] = [];

	async function categorySelect(categoryId: number) {
		console.log(`Valittu kategoria: ${categoryId}`);
		try {
			const questions = await triviaManager.fetchCategory(categoryId);
			console.log(`Haettu ${questions.length} kysymystä kategorialle ${categoryId}`);
			kategoriaValittu = true;
		} catch (error) {
			console.error('Haku ei onnistunut', error);
		}
	}

	//API dataan pääsee käsiksi:

	//triviaManager.selectedCategoryId
	//Valittu kategoria

	//triviaManager.selectedCategory
	//Koko kategoria objekti.

	//triviaManager.questions
	//Kaikki kysymykset valitusta kategoriasta.
</script>

<!-- HTML tähän. Ei HTML tägiä, ei toimi Sveltessä -->
<head>
	<title>MindSpark Trivia</title>
</head>

<div id="container">
	{#if !kategoriaValittu}
		<h1>Welcome to MindSpark!</h1>
		<h2>Are you ready to test your knowledge?</h2>
		<h3>Choose a category</h3>
	{/if}

	{#if triviaManager.categories}
	<div class="catcontainer">
		{#each triviaManager.categories as category}
			<Button text={category.name} onclick={() => categorySelect(category.id)} />
		{/each}
	</div>
	{/if}
</div>

<style>
		#container {
		width: 100%;
		height: 100%;
		font-size: 100%;
		text-align: center;
		background-color: var(--body-color);
		color: #411c5e;
	}

	.catcontainer {
	display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
	}
</style>
