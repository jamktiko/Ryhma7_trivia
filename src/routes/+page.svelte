<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';

	// Function to handle category selection and store it
	async function categorySelect(categoryId: number) {
		console.log(`Selected category ID: ${categoryId}`);

		// Fetch and store questions for this category
		try {
			const questions = await triviaManager.fetchCategory(categoryId);
			console.log(`Fetched ${questions.length} questions for category ${categoryId}`);

			// The selection is now stored in triviaManager.selectedCategoryId
			// and the questions are stored in triviaManager.questions
		} catch (error) {
			console.error('Failed to fetch questions:', error);
		}
	}
</script>

<!-- HTML tähän -->
<head>
	<title>MindSpark Trivia</title>
</head>

<div>
	<h1>Welcome to MindSpark!</h1>
	<h2>Are you ready to test your knowledge?</h2>
	<h3>Choose a category</h3>

	<!-- Display categories using the Button component -->
	{#if triviaManager.categories}
		{#each triviaManager.categories as category}
			<Button text={category.name} onclick={() => categorySelect(category.id)} />
		{/each}
	{/if}

	<!-- Show the selected category and question count if available -->
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
