<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';

	// Tähän propsien määrittelyyn hyödynnetty AI:n apua.
	interface Props {
		onCategorySelect: (categoryId: number) => Promise<void>;
	}

	let { onCategorySelect }: Props = $props();
</script>

<div class="catcontainer">
	<h3>Choose a category!</h3>
	<div class="buttoncontainer">
		{#each triviaManager.categories as category}
			<Button
				text={category.name}
				color="button1-color"
				onclick={() => onCategorySelect(category.id)}
			/>
		{/each}
	</div>
</div>

<style>
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
		h3 {
			font-size: 28px;
			padding: 10px 0 5px 0;
		}
	}

	@media only screen and (max-height: 745px) {
		h3 {
			font-size: 28px;
			padding: 10px 0 5px 0;
		}
	}
</style>
