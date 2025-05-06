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

<!-- Ajastin ja kysymysnumero -->
<div class="header">
	<div class="question-counter">
		{triviaManager.currentQuestionIndex + 1}/{triviaManager.questions.length}
	</div>
	<div class="points">Score: {triviaManager.score}</div>
	<div class="timer">
		<span class="material-symbols-outlined">timer</span>15s
	</div>
</div>

<!-- Progress bar -->
<div class="progress-container">
	<div class="progress-bar" style="width: 100%"></div>
</div>

<!-- Tulostaa kategorian nimen -->
<div class="question-container">
	<div class="question-info">
		<div class="category-name">{triviaManager.currentQuestion.category}</div>
	</div>

	<!-- Dekoodaa ja tulostaa kysymyksen luettavaksi -->
	<div class="question">
		<h4 class="questiontext">{decodeHTML(triviaManager.currentQuestion.question)}</h4>
	</div>

	<!-- Tulostaa correct / incorrect vastausvalinnan jälkeen -->
	<div class="result-message-container">
		{#if triviaManager.selectedAnswer !== null}
			<div class="result-message {triviaManager.isAnswerCorrect ? 'correct' : 'incorrect'}">
				{triviaManager.isAnswerCorrect ? 'Correct!' : 'Incorrect!'}
			</div>
		{/if}
	</div>

	<!-- Käy läpi taulukon, jonka shuffledAnswers luo ja tulostaa ne for each metodilla. -->
	<div class="answers-container">
		{#each triviaManager.shuffledAnswers as answer, i}
			{#if answer === triviaManager.selectedAnswer}
				<Button
					text={decodeHTML(answer)}
					color={triviaManager.isAnswerCorrect ? 'correctans-color' : 'wrongans-color'}
					onclick={() => answerSelector(answer)}
					disabled={!triviaManager.canSelectAnswer}
					font="KoHo"
					fontSize="26px"
				/>
			{:else}
				<!-- Tulostaa buttonin värin ehdollisesti, riippuen kysymysnumerosta -->
				<Button
					text={decodeHTML(answer)}
					color={i === 0
						? 'ansbutton1-color'
						: i === 1
							? 'ansbutton2-color'
							: i === 2
								? 'ansbutton3-color'
								: 'ansbutton4-color'}
					font="KoHo"
					fontSize="26px"
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
		margin: 2px auto auto auto;
		padding: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.question-info {
		text-align: center;
	}

	.category-name {
		font-size: 25px;
		font-family: 'Protest Strike', sans-serif;
		margin: auto;
	}

	.answers-container {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}

	.header {
		width: 40%;
		max-width: 40%;
		margin-bottom: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: 'Protest Strike', sans-serif;
	}

	.question-counter {
		font-size: 1.5rem;
		color: #4b1d6f;
	}
	.points {
		font-size: 1.6rem;
		color: #4b1d6f;
		padding-left: 30px;
	}
	.timer {
		background-color: rgba(65, 28, 94, 30%);
		color: #4b1d6f;
		padding: 6px 12px;
		border-radius: 999px;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.9rem;
		font-family: 'KoHo', sans-serif;
	}

	.progress-container {
		width: 40%;
		min-width: 200px;
		min-height: 20px;
		margin: 5px;
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
		width: 450px;
		height: auto;
		min-height: 80px;
		margin: 10px auto;
		background-color: rgba(245, 245, 245, 60%);
		border: 1px solid #411c5e;
		border-radius: 20px;
		font-family: 'KoHo', sans-serif;
		color: #411c5e;
		text-align: center;
		box-shadow:
			2px 2px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
		padding: 15px;
	}

	.questiontext {
		font-size: 24px;
		font-weight: lighter;
		padding: 0;
		margin: 0;
	}

	.result-message-container {
		height: 40px; /* Reserve space for the result message */
		display: flex;
		align-items: center; /* Vertically center the message */
		justify-content: center; /* Horizontally center the message */
	}

	.result-message {
		margin: 0; /* Remove any margin to prevent shifting */
		padding: 2px 10px;
		border-radius: 10px;
		font-size: 18px;
		font-weight: bold;
		text-transform: uppercase;
		font-family: 'KoHo', sans-serif;
		opacity: 0; /* Start hidden */
		transition: opacity 0.3s ease-in-out; /* Smooth fade-in effect */
	}

	.correct {
		background-color: rgba(46, 204, 113, 0.3);
		color: #27ae60;
		opacity: 1;
	}

	.incorrect {
		background-color: rgba(231, 76, 60, 0.3);
		color: #c0392b;
		opacity: 1;
	}

	@media only screen and (max-width: 412px) {
		.question,
		.questiontext {
			width: 90%;
			min-width: 180px;
			height: auto;
			font-size: 20px;
			padding: 10px;
			margin: 10px auto;
		}

		.header {
			width: 90%;
			max-width: 90%;
		}

		.progress-container {
			width: 80%;
		}
	}

	@media only screen and (min-width: 412px) and (max-width: 655px) {
		.question,
		.questiontext {
			width: 80%;
			min-width: 230px;
			height: auto;
			font-size: 23px;
			padding: 10px;
			text-align: center;
		}

		.header {
			width: 80%;
			max-width: 80%;
		}

		.progress-container {
			width: 70%;
		}

		/* h3 {
			font-size: 18px;
			padding: 15px;
		} */

		.category-name {
			font-size: 20px;
		}

		.result-message {
			font-size: 22px;
			padding: 8px 16px;
		}
	}

	@media only screen and (min-height: 480px) and (max-height: 655px) {
		.question,
		.questiontext {
			width: 80%;
			min-width: 30%;
			height: auto;
			min-height: 110px;
			font-size: 20px;
			margin: 10px auto;
			padding: 10px;
			text-align: center;
		}
	}

	@media only screen and (max-height: 480px) {
		.question,
		.questiontext {
			width: 80%;
			min-width: 40px;
			min-height: 80px;
			font-size: 15px;
			margin: auto;
			padding: 10px;
			text-align: center;
		}
	}
</style>
