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
	let totalQuestions = 20;

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
	<div class="header">
		<div class="question-counter">{questionNumber}/{totalQuestions}</div>
		<div class="timer">
			<span class="material-symbols-outlined"> timer </span>{Math.ceil(timeLeft)}s
		</div>
	</div>

	<div class="progress-container">
		<div class="progress-bar" style="width: {progress}%"></div>
	</div>
	<div class="question">
		<h4 class="questiontext">What is the heaviest insect?</h4>
	</div>
	{#if triviaManager.categories}
		<div class="ccategories">
			<div class="categories">
				<button id="ansbutton1">A. Answer</button>
				<button id="ansbutton2">B. Answer</button>
				<button id="ansbutton3">C. Answer</button>
				<button id="ansbutton4">D. Answer</button>
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
		font-family: 'Protest Strike', sans-serif;
		padding: 10px;
		margin: 0;
	}
	h2 {
		font-size: 48px;
		font-family: 'Protest Strike', sans-serif;
		padding: 5px;
		margin: 0;
	}

	h3 {
		font-size: 40px;
		font-family: 'KoHo', sans-serif;
		padding: 50px 0 20px 0;
		margin: 0;
	}
	.header {
		margin-left: 30%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 5px;
		font-family: 'Protest Strike', sans-serif;
	}

	.question-counter {
		font-weight: 700;
		font-size: 1.5rem;
		color: #4b1d6f;
	}

	.timer {
		margin-right: 43%;
		background-color: rgba(65, 28, 94, 30%);
		color: #4b1d6f;
		padding: 6px 12px;
		border-radius: 999px;
		font-weight: 500;
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.9rem;
		font-family: 'KoHo', sans-serif;
	}

	.progress-container {
		width: 40%;
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
	.question {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		width: 340px;
		height: 140px;
		margin: 20px auto;
		background-color: rgba(245, 245, 245, 60%);
		border: 1px solid #411c5e;
		border-radius: 20px;
		box-shadow: 2px, 6px, 4px, rgba(0, 0, 0, 25%);
		font-family: 'KoHo', sans-serif;
		color: #411c5e;
		text-align: center;
		box-shadow:
			2px 2px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}
	.questiontext {
		font-size: 30px;
		font-family: 'KoHo';
		font-weight: lighter;
		padding: 0;
		margin: 0;
	}
	.ccategories {
		max-width: 672px;
		margin: auto;
	}

	.categories {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}

	#ansbutton1,
	#ansbutton2,
	#ansbutton3,
	#ansbutton4 {
		width: 280px;
		min-width: 280px;
		height: 130px;
		background-color: var(--button1-color);
		margin: 8px;
		border-radius: 30px;
		border: none;
		font-family: 'Protest Strike';
		font-size: 32px;
		color: var(--buttontext-color);
		box-shadow:
			2px 2px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}

	#ansbutton1 {
		background-color: var(--ansbutton1-color);
		border: none;
		font-family: 'KoHo', sans-serif;
	}

	#ansbutton2 {
		background-color: var(--ansbutton2-color);
		border: none;
		font-family: 'KoHo', sans-serif;
	}

	#ansbutton3 {
		background-color: var(--ansbutton3-color);
		border: none;
		font-family: 'KoHo', sans-serif;
	}

	#ansbutton4 {
		background-color: var(--ansbutton4-color);
		border: none;
		font-family: 'KoHo', sans-serif;
	}
	#ansbutton1:hover {
		background-color: rgba(160, 198, 207);
		border: none;
		font-family: 'KoHo', sans-serif;
		box-shadow:
			1px 1px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}

	#ansbutton2:hover {
		background-color: rgba(192, 155, 173);
		border: none;
		font-family: 'KoHo', sans-serif;
		box-shadow:
			1px 1px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}

	#ansbutton3:hover {
		background-color: rgba(65, 28, 94, 35%);
		border: none;
		font-family: 'KoHo', sans-serif;
		box-shadow:
			1px 1px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}

	#ansbutton4:hover {
		background-color: rgba(253, 170, 83, 60%);
		border: none;
		font-family: 'KoHo', sans-serif;
		box-shadow:
			1px 1px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}
	@media only screen and (max-width: 412px) {
		.header {
			margin-left: 23%;
			margin-bottom: 3px;
		}
		.timer {
			margin-right: 29%;
			margin-top: 6px;
			padding: 3px 6px;
		}
		.progress-container {
			width: 55%;
		}
		.question,
		.questiontext {
			width: 40%;
			min-width: 40%;
			height: 110px;
			font-size: 17px;
			margin: 10px auto;
		}
		#ansbutton1,
		#ansbutton2,
		#ansbutton3,
		#ansbutton4 {
			width: 50%;
			min-width: 50%;
			height: 40px;
			font-size: 15px;
		}
	}
	@media only screen and (min-width: 413px) and (max-width: 655px) {
		.question,
		.questiontext {
			width: 60%;
			min-width: 60%;
			height: 100%;
			font-size: 25px;
			margin: 20px auto;
			text-align: center;
		}
		#ansbutton1,
		#ansbutton2,
		#ansbutton3,
		#ansbutton4 {
			width: 50%;
			min-width: 50%;
			height: 50px;
			font-size: 25px;
		}
		.header {
			margin-left: 18%;
		}
		.timer {
			margin-right: 21.5%;
		}
		.progress-container {
			width: 65%;
		}
	}
</style>
