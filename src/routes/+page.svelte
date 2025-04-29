<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';

	async function categorySelect(categoryId: number) {
		console.log(`Valittu kategoria: ${categoryId}`);
		try {
			const questions = await triviaManager.fetchCategory(categoryId);
			console.log(`Haettu ${questions.length} kysymystä kategorialle ${categoryId}`);
		} catch (error) {
			console.error('Haku ei onnistunut', error);
		}
	}
</script>

<!-- HTML tähän. Ei HTML tägiä, ei toimi Sveltessä -->
<head>
	<title>MindSpark Trivia</title>
</head>

<div>
	<h1>Welcome to MindSpark!</h1>
	<h2>Are you ready to test your knowledge?</h2>
	<h3>Choose a category</h3>

	{#if triviaManager.categories}
		{#each triviaManager.categories as category}
			<Button text={category.name} onclick={() => categorySelect(category.id)} />
		{/each}
	{/if}
</div>

<style>
</style>
