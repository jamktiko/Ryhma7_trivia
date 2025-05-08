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

<!-- Peli käynnissä, kunnes vastattu 20 kysymykseen tai ajastin loppuu. -->
{#if triviaManager.totalAnswers !== 20}
	<!-- Näytetään ajastin ja kysymys-vastauskomponentti, kun kategoria on valittu -->
	<div class="container">
		<div class="header-container">
			<div class="header">
				<!-- Kysymysnumero -->
				<div class="question-counter">
					{triviaManager.currentQuestionIndex + 1}/{triviaManager.questions.length}
				</div>
				<!-- Pisteet -->
				<div class="points">Score: {triviaManager.score}</div>
				<!-- Ajastin -->
				<div class="timer">
					<span class="material-symbols-outlined">timer</span>{triviaManager.ajastin}
				</div>
			</div>
			<!-- Progress bar -->
			<div class="progress-container">
				<div class="progress-bar" style="width: {(triviaManager.ajastin / 20) * 100}%;"></div>
			</div>
		</div>
	</div>
	<div class="question-container">
		<!-- Tulostaa kategorian nimen -->
		<div class="question-info">
			<div class="category-name">{triviaManager.currentQuestion.category}</div>
		</div>
		<!-- Dekoodaa ja tulostaa kysymyksen luettavaksi -->
		<div class="question">
			<h4 class="questiontext">{decodeHTML(triviaManager.currentQuestion.question)}</h4>
		</div>
		<div class="answers-container">
			<!-- Tulostaa correct / incorrect vastausvalinnan jälkeen -->
			<!-- Jos aika loppuu, tulostuu Ran out of time -->
			<div class="result-message-container">
				{#if triviaManager.selectedAnswer !== null}
					<div
						class="result-message {triviaManager.selectedAnswer === 'TIMEOUT'
							? 'timeout'
							: triviaManager.isAnswerCorrect
								? 'correct'
								: 'incorrect'}"
					>
						{#if triviaManager.selectedAnswer === 'TIMEOUT'}
							Ran out of time!
						{:else if triviaManager.isAnswerCorrect}
							Correct!
						{:else}
							Incorrect!
						{/if}
					</div>
				{/if}
			</div>
			<div class="answers-box">
				<!-- Vastaus vaihtoehdot nappeihin each metodilla -->
				<!-- Vastauksien paikat seikoitettu shuffledAnswers funktiolla -->
				<!-- Tulostaa buttonin värin ehdollisesti, riippuen kysymysnumerosta ja vastauksen tuloksesta -->
				{#each triviaManager.shuffledAnswers as answer, i}
					{#if answer === triviaManager.selectedAnswer}
						<Button
							text={decodeHTML(answer)}
							color={triviaManager.isAnswerCorrect ? 'correctans-color' : 'wrongans-color'}
							onclick={() => answerSelector(answer)}
							disabled={!triviaManager.canSelectAnswer}
							font="KoHo"
							fontSize="24px"
						/>
					{:else}
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
							fontSize="24px"
							onclick={() => answerSelector(answer)}
							disabled={!triviaManager.canSelectAnswer}
						/>
					{/if}
				{/each}
			</div>
		</div>
	</div>
	<!-- Kun peli päättyy, näytetään loading screen ennen reititystä -->
{:else}
	<div class="container">
		<h1>Getting your score</h1>
		<span class="loader"></span>
		<h2>Please wait a moment...</h2>
	</div>
{/if}

<style>
	.loader {
		width: 58px;
		height: 58px;
		border: 5px solid rgba(245, 245, 245, 0.6);
		border-bottom-color: transparent;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}
	/* Loader keyframes */
	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
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
	.progress-bar {
		width: 100%;
		height: 10px;
		background-color: #e0e0e0; /* Taustaväri */
		border-radius: 5px;
		overflow: hidden;
	}

	.progress-bar {
		height: 20px;
		background-color: #4b1d6f;
		animation: countdown 20s linear forwards;
		animation-play-state: running;
	}

	@keyframes decrease-width {
		from {
			width: 100%; /* Aloittaa täytenä */
		}
		to {
			width: 0%; /* Päättyy tyhjänä */
		}
	}
	.container {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		max-width: 100%;
		width: 672px;
	}

	.header-container {
		width: 100%;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.question-container {
		max-width: 672px;
		margin: 0px;
		padding: 0px;
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
		margin-top: auto;
		max-width: 672px;
		bottom: 0px;
		margin-bottom: 20px;
	}

	.answers-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.header {
		width: 100%;
		max-width: 100%;
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
		width: 100%;
		min-width: 200px;
		min-height: 20px;
		margin: 5px;
		background-color: #f0eaf9;
		border-radius: 999px;
		overflow: hidden;
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

	.timeout {
		background-color: rgba(241, 196, 15, 0.3);
		color: #d35400;
		opacity: 1;
	}
	@media only screen and (max-width: 688px) {
		.header-container {
			width: 90%;
		}
		.question {
			width: 80%;
			min-width: 230px;
			height: auto;
		}

		.questiontext {
			font-size: 23px;
			text-align: center;
		}

		.category-name {
			font-size: 20px;
		}
		.result-message {
			font-size: 22px;
			padding: 8px 16px;
		}
	}
	h1 {
		font-size: 40px;
	}
	h2 {
		font-size: 32px;
	}
	@media only screen and (max-width: 412px) {
		.answers-container {
			margin-bottom: 55px;
		}
	}

	@media only screen and (max-height: 655px) {
		h1 {
			font-size: 40px;
		}
		h2 {
			font-size: 32px;
		}
		.question {
			width: 80%;
			min-width: 30%;
			height: auto;
		}
		.questiontext {
			font-size: 20px;
			text-align: center;
		}
	}

	@media only screen and (max-height: 480px) {
		.question {
			width: 80%;
			min-width: 40px;
			min-height: 80px;
			margin: auto;
		}

		.questiontext {
			text-align: center;
			font-size: 15px;
		}

		.questiontext {
			text-align: center;
			font-size: 15px;
		}
	}
</style>
