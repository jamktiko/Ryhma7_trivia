<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';

	function answerSelector(answer: string) {
		triviaManager.selectAnswer(answer);
	}

	// Tarvitsee tämän funtion, jotta HTML-koodit saadaan dekoodattua luettavaksi.
	// Tullut täysin AI:lta, mutta pakollinen.
	function decodeHTML(html: string): string {
		const textarea = document.createElement('textarea');
		textarea.innerHTML = html;
		return textarea.value;
	}
</script>

<div class="question-container">
	<div class="question-info">
		<!-- Tulostaa kategorian nimen ja kysymyksen numeron. -->
		<div class="category-name">{triviaManager.currentQuestion.category}</div>
		<div>Question {triviaManager.currentQuestionIndex + 1} / {triviaManager.questions.length}</div>
	</div>
	<!-- Dekoodaa ja tulostaa kysymyksen luettavaksi -->
	<h3>{decodeHTML(triviaManager.currentQuestion.question)}</h3>

	<!-- Tulostaa correct / incorrect vastausvalinnan jälkeen -->
	{#if triviaManager.selectedAnswer !== null}
		<div class="result-message {triviaManager.isAnswerCorrect ? 'correct' : 'incorrect'}">
			{triviaManager.isAnswerCorrect ? 'Correct!' : 'Incorrect!'}
		</div>
	{/if}

	<div class="answers-container">
		<!-- Käy läpi taulukon, jonka shuffledAnswers luo ja tulostaa ne for each metodilla. -->
		{#each triviaManager.shuffledAnswers as answer, i}
			{#if answer === triviaManager.selectedAnswer}
				<Button
					text={decodeHTML(answer)}
					color={triviaManager.isAnswerCorrect ? 'correctans-color' : 'wrongans-color'}
					onclick={() => answerSelector(answer)}
					disabled={!triviaManager.canSelectAnswer}
				/>
			{:else}
				<Button
					text={decodeHTML(answer)}
					color={['ansbutton1-color', 'ansbutton2-color', 'ansbutton3-color', 'ansbutton4-color'][
						i
					]}
					onclick={() => answerSelector(answer)}
					disabled={!triviaManager.canSelectAnswer}
				/>
			{/if}
		{/each}
	</div>
</div>

<style>
	.question-container {
		max-width: 672px;
		margin: 20px auto;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.question-info {
		margin-bottom: 20px;
		text-align: center;
	}

	.category-name {
		font-size: 24px;
		font-family: 'KoHo', sans-serif;
		margin-bottom: 8px;
	}

	h3 {
		background-color: rgba(255, 255, 255, 0.4);
		padding: 20px;
		border-radius: 15px;
		margin-bottom: 30px;
		font-size: 24px;
		font-family: 'KoHo', sans-serif;
		max-width: 600px;
		text-align: center;
	}

	/* Feedback message styling */
	.result-message {
		font-size: 28px;
		font-weight: bold;
		font-family: 'Protest Strike', sans-serif;
		padding: 10px 20px;
		border-radius: 10px;
		margin-bottom: 20px;
		text-align: center;
	}

	.correct {
		color: #048100;
		background-color: rgba(134, 231, 127, 0.3);
	}

	.incorrect {
		color: #810000;
		background-color: rgba(244, 118, 118, 0.3);
	}

	.answers-container {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}

	@media only screen and (max-width: 655px) {
		h3 {
			font-size: 18px;
			padding: 15px;
		}

		.category-name {
			font-size: 20px;
		}

		.result-message {
			font-size: 22px;
			padding: 8px 16px;
		}
	}
</style>
