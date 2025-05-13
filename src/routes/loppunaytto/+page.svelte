<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	//Tähän true niin loader on näkyvissä kokoajan
	let isLoading = $state(false);
	const params = $page.url.searchParams;
	const highScore = params.get('highScore');

	//Play Again nappi, joka kutsuu triviaManager.playAgain() funktiota ja lataa uuden pelin
	//Jos kategoriaa ei ole valittu, ohjataan pääsivulle
	async function handlePlayAgain() {
		if (triviaManager.selectedCategoryId !== null) {
			isLoading = true;
			await triviaManager.playAgain(triviaManager.selectedCategoryId);
			isLoading = false;
		} else {
			goto('/');
		}
	}
	//Timeout toiminnallisuus, joka odottaa 1 sekunnin ennen kuin ohjaa kategorian valintaan.
	//Ilman tätä latausnäyttö ei näy, koska tässä ei oikeasti ladata mitään.
	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
	async function handleChangeCategories() {
		isLoading = true;
		triviaManager.reset();
		await delay(1000);
		goto('/');
	}
</script>

<!-- Näytetään kun peli latautuu -->
{#if isLoading}
	<h1>Loading a new game</h1>
	<span class="loader"></span>
	<h2>Please wait a moment.</h2>
{:else}
	<!-- Tulostetaan "onnitteluviestit" pistemäärien mukaan -->
	<div class="container">
		{#if triviaManager.score < 75}
			<div>
				<h1>Oh no!</h1>
				<h2>You don't have a spark mind!</h2>
			</div>
		{:else if triviaManager.score < 150}
			<div>
				<h1>You did ok.</h1>
				<h2>But you can do better!</h2>
			</div>
		{:else if triviaManager.score < 225}
			<div>
				<h1>Good job!</h1>
				<h2>Your mind has quite the spark!</h2>
			</div>
		{:else if triviaManager.score >= 225}
			<div>
				<h1>Wow!</h1>
				<h2>You have a spark mind!</h2>
			</div>
		{/if}

		<!-- Tulostaa pisteet -->
		<div class="scoretext">
			<h4>You scored {triviaManager.score} points!</h4>
			<h4>You got {triviaManager.correctAnswers}/20 questions right!</h4>
			<h4>Highscore for category {triviaManager.selectedCategory?.name}: {highScore}</h4>
		</div>

		<div class="bt-contcontainer">
			<h3>Do you want to play again?</h3>
			<div class="button-container">
				<Button
					text="Change categories"
					color="button2-color"
					onclick={handleChangeCategories}
					font="Protest Strike"
					fontSize="26px"
				/>
				<Button
					text="Play again"
					color="button3-color"
					onclick={handlePlayAgain}
					font="Protest Strike"
					fontSize="32px"
				/>
			</div>
		</div>
	</div>
{/if}

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		max-width: 100%;
		width: 672px;
		height: 100%;
	}
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
	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	h1 {
		font-size: 46px;
		font-family: 'Protest Strike', sans-serif;
		padding-top: 15px;
		margin: auto;
	}
	h2 {
		font-size: 40px;
		font-family: 'Protest Strike', sans-serif;
		padding-bottom: 5px;
		margin: auto;
	}
	h3 {
		font-size: 38px;
		font-family: 'KoHo', sans-serif;
		padding: 8px;
		margin: 0;
	}
	h4 {
		font-size: 28px;
		font-family: 'KoHo', sans-serif;
		font-weight: lighter;
		margin: 0;
		padding-bottom: 8px;
	}
	.scoretext {
		margin: 5px auto 30px;
	}
	.button-container {
		margin-top: auto;
		width: 100%;
		bottom: 0px;
		margin-bottom: 20px;
		display: flex;
		flex-direction: row;
		gap: 15px;
		justify-content: center;
		flex-wrap: wrap;
	}
	.bt-contcontainer {
		width: 100%
	}
	@media only screen and (max-width: 655px) {
		h1 {
			font-size: 44px;
		}
		h2 {
			font-size: 36px;
			padding: 5px 20px;
		}
		h3 {
			font-size: 33px;
		}
		h4 {
			font-size: 28px;
			padding: 1px 20px;
		}
		.button-container {
			gap: 0;
		}
	}
	@media only screen and (max-width: 444px) {
		h1 {
			font-size: 40px;
		}
		h2 {
			font-size: 34px;
			padding: 5px 20px;
		}
		h3 {
			font-size: 30px;
		}
		h4 {
			font-size: 25px;
			padding: 1px 20px;
		}
		.button-container {
			gap: 0;
		}
	}
	@media only screen and (max-width: 350px) {
		h1 {
			font-size: 30px;
		}
		h2 {
			font-size: 25px;
			padding: 5px 20px;
		}
		h3 {
			font-size: 22px;
		}
		h4 {
			font-size: 15px;
			padding: 1px 20px;
		}
		.button-container {
			gap: 0;
		}
	}
</style>
