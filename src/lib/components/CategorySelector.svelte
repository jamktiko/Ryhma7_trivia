<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';

	interface Props {
		categorySelector: (categoryId: number) => Promise<boolean>;
	}
	let { categorySelector }: Props = $props();

	//Nämä trueksi testaamista ja tyylittelyä varten
	//Molemmat ei voi olla true samaan aikaan.
	let isLoading = $state(false);
	let error = $state(false);

	async function selectCategory(categoryId: number) {
		isLoading = true;
		error = false;
		//Jos fetch epäonnistuu -> error message
		try {
			const success = await categorySelector(categoryId);
			if (!success) {
				error = true;
			}
		} catch (err) {
			error = true;
			console.error('Category selection error:', err);
		} finally {
			// Jos kaikki ok, loading screen pois ja peli alkaa
			isLoading = false;
		}
	}

	function tryAgain() {
		//"Resettaa" kategorian valinnan ja lataa sen uudestaan
		error = false;
	}
</script>

<!-- Jos kaikki ok, näytetään kategoria valinta -->
{#if !isLoading && !triviaManager.isCategorySelected && !error}
	<div class="container">
		<div>
			<h1>Welcome to MindSpark!</h1>
			<h2>Are you ready to test your knowledge?</h2>
		</div>
		<div class="objcontainer">
			<h4>
				Choose the quiz category you want to play. You will be presented with 20 questions and your
				objective is to answer them correctly as fast as possible to get the maximum amount of
				points.
			</h4>
		</div>

		<div class="catcontainer">
			<h3>Choose a category!</h3>
			<div class="buttoncontainer">
				<!-- Kategoriat nappeihin taulukosta each metodilla -->
				{#each triviaManager.categories as category}
					<Button
						text={category.name}
						color="button1-color"
						onclick={() => selectCategory(category.id)}
						font="Protest Strike"
						fontSize="32px"
					/>
				{/each}
			</div>
		</div>
	</div>
	<!-- Jos fetch epäonnistuu, tulostuu "error message" ja "try again" nappi -->
{:else if error}
	<div class="container">
		<h1>Error Loading Questions</h1>
		<div class="error-message">
			<h3>Failed to load questions. Please try again.</h3>
		</div>
		<Button
			text="Try Again"
			color="button1-color"
			onclick={tryAgain}
			font="Protest Strike"
			fontSize="32px"
		/>
	</div>
{:else}
	<!-- Lautausnäyttö, kun kategoria on valittu onnistuneesti -->
	<div class="container">
		<h1>Your game is loading</h1>
		<span class="loader"></span>
		<h2>Please wait a moment.</h2>
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
	.container {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
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

	h4 {
		font-size: 20px;
		font-family: 'Koho';
		padding: 0;
		margin: 0;
	}

	.catcontainer {
		bottom: 0;
		max-width: 672px;
		padding-bottom: 20px;
	}

	.buttoncontainer {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		min-height: 200px;
	}

	.objcontainer {
		width: 600px;
	}

	@media only screen and (max-width: 840px) {
		.objcontainer {
			display: none;
		}
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

	@media only screen and (max-height: 670px) {
		.objcontainer {
			display: none;
		}
	}

	.error-message {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		margin: 20px 0;
		color: #e74c3c;
	}
</style>
