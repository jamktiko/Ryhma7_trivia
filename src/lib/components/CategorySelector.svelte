<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';

	interface Props {
		categorySelector: (categoryId: number) => Promise<void>;
	}
	let { categorySelector }: Props = $props();

	// Add loading state
	let isLoading = $state(false);

	// Wrap the category selection in a function that shows the loader
	async function selectCategory(categoryId: number) {
		isLoading = true;
		await categorySelector(categoryId);
		isLoading = false;
	}
</script>

{#if !isLoading && !triviaManager.isCategorySelected}
	<div class="container">
		<div>
			<h1>Welcome to MindSpark!</h1>
			<h2>Are you ready to test your knowledge?</h2>
		</div>

		<div class="objcontainer">
			<h4>
				Choose the quiz category you want to play. You will be presented with 20 questions and your
				objective is to answer them correctly as fast as possible to get the maximum amount of
				points
			</h4>
		</div>
	</div>
	<div class="catcontainer">
		<h3>Choose a category!</h3>
		<div class="buttoncontainer">
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
{:else}
	<div class="container">
		<h1>Your game is loading</h1>
		<span class="loader"></span>
		<h2>Please wait a moment.</h2>
	</div>
{/if}

<style>
	.loader {
		width: 48px;
		height: 48px;
		border: 5px solid #fff;
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
		width: 800px;
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
</style>
