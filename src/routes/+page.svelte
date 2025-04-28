<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';

	async function categorySelect(categoryId: number) {
		console.log(`Selected category ID: ${categoryId}`);
		try {
			const questions = await triviaManager.fetchCategory(categoryId);
			console.log(`Fetched ${questions.length} questions for category ${categoryId}`);
		} catch (error) {
			console.error('Failed to fetch questions:', error);
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
	{#if triviaManager.selectedCategoryId}
		<div class="selection-info">
			<p>Selected category: {triviaManager.selectedCategory?.name}</p>
			<p>Questions loaded: {triviaManager.questions.length}</p>
		</div>
	{/if}
</div>

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
	.selection-info {
		margin-top: 20px;
		padding: 10px;
		background-color: #f0f0f0;
		border-radius: 5px;
	}
	h3 {
		font-size: 40px;
	}
</style>
