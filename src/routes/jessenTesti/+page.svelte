<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';
	import { goto } from '$app/navigation';
</script>

<div class="container">
	<div>
		<h1>welcome to MindSpark!</h1>
		<h2>Are you ready to test your knowledge?</h2>
	</div>
	<div class="start-container">
		<div class="buttoncontainer">
			<Button
				text="Start Game"
				color="button1-color"
				onclick={() => goto('/')}
				font="Protest Strike"
				fontSize="32px"
			/>
		</div>
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
	.start-container {
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
</style>
