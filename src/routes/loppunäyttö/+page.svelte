<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';
	import { goto } from '$app/navigation';
</script>

{#if triviaManager.correctAnswers < 5}
	<h1>Oh no!</h1>
	<h2>You don’t have a spark mind!</h2>
{:else if triviaManager.correctAnswers < 15}
	<h1>You did ok.</h1>
	<h2>But you can do better!</h2>
{:else if triviaManager.correctAnswers >= 15}
	<h1>Wow!</h1>
	<h2>You have a spark mind!</h2>
{/if}
<div class="scoretext">
	<h4>You scored {triviaManager.score} points!</h4>
	<h4>You got {triviaManager.correctAnswers}/20 questions right!</h4>
</div>
<h3>Do you want to play again?</h3>

<Button
	text="Play again"
	color="button1-color"
	onclick={() => {
		if (triviaManager.selectedCategoryId !== null) {
			triviaManager.playAgain(triviaManager.selectedCategoryId);
		} else {
			goto('/');
		}
	}}
	font="Protest Strike"
/>

<Button
	text="Change categories"
	color="button1-color"
	onclick={() => {
		triviaManager.reset();
		goto('/');
	}}
	font="Protest Strike"
	fontSize="28px"
/>

<style>
	h1 {
		font-size: 50px;
		font-family: 'Protest Strike', sans-serif;
		padding-top: 10px;
		margin: auto;
	}
	h2 {
		font-size: 45px;
		font-family: 'Protest Strike', sans-serif;
		padding-bottom: 10px;
		margin: auto;
	}

	h3 {
		font-size: 40px;
		font-family: 'KoHo', sans-serif;
		padding: 15px;
		margin: 0;
	}
	h4 {
		font-size: 34px;
		font-family: 'KoHo', sans-serif;
		font-weight: lighter;
		margin: 0;
		padding-bottom: 8px;
	}
	.scoretext {
		margin: 8px 5px 38px;
	}
	button {
		width: 312px;
		min-width: 312px;
		height: 87px;
		margin: 8px;
		border-radius: 30px;
		border: none;
		font-family: 'Protest Strike', sans-serif;
		color: var(--buttontext-color);
		font-size: 32px;
		background-color: rgba(253, 170, 83, 30%);
		box-shadow:
			2px 2px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}

	#changecatbut {
		background-color: rgba(251, 217, 182, 30%);
	}

	button:hover {
		background-color: rgba(253, 170, 83, 40%);
		box-shadow:
			1px 1px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}

	#changecatbut:hover {
		background-color: rgba(251, 217, 182, 50%);
		box-shadow:
			1px 1px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}
	@media only screen and (min-width: 412px) and (max-width: 655px) {
		h1 {
			font-size: 48px;
		}
		h2 {
			font-size: 40px;
		}
		h3 {
			font-size: 35px;
		}
		h4 {
			font-size: 31px;
		}
	}
	@media only screen and (max-width: 412px) {
		h1 {
			font-size: 40px;
		}
		h2 {
			font-size: 35px;
		}
		h3 {
			font-size: 30px;
		}
		h4 {
			font-size: 28px;
		}
	}
</style>
