<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';

	interface Props {
		categorySelector: (categoryId: number) => Promise<void>;
	}
	let { categorySelector }: Props = $props();
</script>

<div class="container">
	<h1>Welcome to MindSpark!</h1>
	<h2>Are you ready to test your knowledge?</h2>
	<h3>Choose a category!</h3>
</div>
<div class="catcontainer">
	<div class="buttoncontainer">
		<!-- Käy läpi triviaManager storessa olevan kategoriataulukon for each metodilla -->
		<!-- renderoi jokaisen taulukon kategorian Button komponentissa -->
		{#each triviaManager.categories as category}
			<Button
				text={category.name}
				color="button1-color"
				onclick={() => categorySelector(category.id)}
			/>
		{/each}
	</div>
</div>

<style>
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
	}

	.buttoncontainer {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		min-height: 200px;
		margin-bottom: 10px;
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
