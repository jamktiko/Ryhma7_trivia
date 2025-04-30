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
	import { onMount, onDestroy } from 'svelte';

	// Parametreja voitaisiin myöhemmin tuoda propseina
	let questionNumber = 6;
	let totalQuestions = 10;

	let totalTime = 15;
	let timeLeft = totalTime;
	let interval;

	onMount(() => {
		interval = setInterval(() => {
			if (timeLeft > 0) {
				timeLeft -= 0.1;
			} else {
				clearInterval(interval);
			}
		}, 100);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	$: progress = (timeLeft / totalTime) * 100;
</script>

<!-- HTML tähän. Ei HTML tägiä, ei toimi Sveltessä -->
<head>
	<title>MindSpark Trivia</title>
</head>
{#if !categorySelected}
	<h1>Welcome to MindSpark!</h1>
	<h2>Are you ready to test your knowledge?</h2>
	<h3>Choose a category!</h3>
	<div class="header">
		<div class="question-counter">{questionNumber}/{totalQuestions}</div>
		<div class="timer">
			<span class="material-symbols-outlined"> timer </span>{Math.ceil(timeLeft)}s
		</div>
	</div>

	<div class="progress-container">
		<div class="progress-bar" style="width: {progress}%"></div>
	</div>
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
		padding: 10px;
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
		padding: 50px 0 20px 0;
		margin: 0;
	}
	.header {
		margin-left: 27.5%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 6px;
		font-family: 'KoHo';
	}

	.question-counter {
		font-weight: 700;
		font-size: 1.5rem;
		color: #4b1d6f;
	}

	.timer {
		margin-right: 38%;
		background-color: rgba(65, 28, 94, 30%);
		color: #4b1d6f;
		padding: 6px 12px;
		border-radius: 999px;
		font-weight: 500;
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.9rem;
		font-family: 'KoHo';
	}

	.progress-container {
		width: 45%;
		margin: auto;
		height: 20px;
		background-color: #f0eaf9;
		border-radius: 999px;
		overflow: hidden;
	}

	.progress-bar {
		height: 100%;
		background-color: #4b1d6f;
		transition: width 0.1s linear;
	}
</style>
