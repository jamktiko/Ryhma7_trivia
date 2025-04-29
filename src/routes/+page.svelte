<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';

	let categorySelected: boolean = false;

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
<head>
	<title>MindSpark Trivia</title>
</head>

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
	<!-- Question and answers screen -->
{:else if triviaManager.questions.length > 0}
	<div class="question-container">
		<!-- Question info -->
		<div class="question-info">
			<h3>Question {triviaManager.currentQuestionIndex + 1} of {triviaManager.questions.length}</h3>
			<p class="category-name">
				Category: {triviaManager.currentQuestion.category}
			</p>
		</div>

		<!-- Question text -->
		<div class="question-text">
			<h2>{triviaManager.currentQuestion.question}</h2>
		</div>

		<!-- Answers -->
		<div class="answers-container">
			{#each triviaManager.shuffledAnswers as answer, i}
				<Button
					text={answer}
					color={triviaManager.selectedAnswer === answer
						? triviaManager.isAnswerCorrect
							? 'success-color'
							: 'danger-color'
						: i === 0
							? 'ansbutton1-color'
							: i === 1
								? 'ansbutton2-color'
								: i === 2
									? 'ansbutton3-color'
									: 'ansbutton4-color'}
					onclick={() => triviaManager.selectAnswer(answer)}
					disabled={!triviaManager.canSelectAnswer}
				/>
			{/each}
		</div>
	</div>
{/if}

<style>
	.catcontainer {
		max-width: 672px;
		margin: auto;
	}
	.buttoncontainer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
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
</style>
