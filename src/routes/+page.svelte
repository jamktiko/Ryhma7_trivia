<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';
	import Pisteytys from '$lib/components/Pisteytys.svelte';

	let categorySelected: boolean = false;
	let kategoriaValittu: boolean = false; // Define the missing variable

	//Funktio kategorian valintaan. Consolelogit testausta varten.
	//Hakee Triviamanagerin API fetchillä datan.
	async function categorySelect(categoryId: number) {
		console.log(`Valittu kategoria: ${categoryId}`);
		try {
			const questions = await triviaManager.fetchCategory(categoryId);
			console.log(`Haettu ${questions.length} kysymystä kategorialle ${categoryId}`);
			categorySelected = true;
		} catch (error) {
			console.error('Haku ei onnistunut', error);
		}
	}
</script>

<!-- HTML tähän. Ei HTML tägiä, ei toimi Sveltessä -->
{#if !categorySelected}
	<h1>Welcome to MindSpark!</h1>
	<h2>Are you ready to test your knowledge?</h2>
	<h3>Choose a category!</h3>

	{#if triviaManager.categories}
		<div class="catcontainer">
			<div class="buttoncontainer">
				{#each triviaManager.categories as category}
					<Button
						text={category.name}
						color="button1-color"
						onclick={() => categorySelect(category.id)}
					/>
				{/each}
			</div>
		</div>
	{/if}
{:else}
	<Pisteytys />
{/if}

<style>
	.catcontainer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}

	.catcontainer {
		max-width: 672px;
		margin: auto;
	}
	.buttoncontainer {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.question-container {
		max-width: 672px;
		margin: 20px auto;
	}
	.question-info {
		margin-bottom: 20px;
	}
	.category-name {
		font-size: 24px;
		font-family: 'KoHo', sans-serif;
	}
	.question-text {
		background-color: rgba(255, 255, 255, 0.4);
		padding: 20px;
		border-radius: 15px;
		margin-bottom: 30px;
	}
	.answers-container {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
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
</style>
