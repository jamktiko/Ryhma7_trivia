<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	// Kategorian valinta
	async function handleCategorySelect(categoryId: number) {
		try {
			const results = await triviaManager.fetchCategory(categoryId);
			console.log(`Category ID: ${categoryId}`);
			console.log(`${results.length} questions loaded`);
		} catch (error) {
			console.error('Error fetching category:', error);
		}
	}
</script>

<div class="categories">
	{#each triviaManager.categories as category}
		<Button text={category.name} onclick={() => handleCategorySelect(category.id)} />
	{/each}
</div>

<style>
</style>
