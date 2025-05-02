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
<div class="container">
	<h1>Welcome to MindSpark!</h1>
	<h2>Are you ready to test your knowledge?</h2>
</div>

	{#if triviaManager.categories}
		<div class="catcontainer">
			<h3>Choose a category!</h3>
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
	.container {
		flex: 1;
    display: flex;
    flex-direction: column;
		justify-content: space-evenly;
    align-items: center;
	}
	.catcontainer {
		bottom: 0;
		max-width: 672px;
	}

	.buttoncontainer {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		min-height: 200px;
		margin-bottom: 10px;
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
