<script lang="ts">
	import Button from '$lib/components/Button.svelte';
</script>

<h1>Oh no!</h1>
<h2>You don’t have a spark mind!</h2>
<h4>You scored X points!</h4>
<h3>Do you want to play again?</h3>

<div>
	<button id="againbut">Play again!</button>
</div>
<button id="changecatbut">Change categories</button>

<style>
	h1 {
		font-size: 55px;
		font-family: 'Protest Strike';
		padding: 10px;
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
		padding: 15px;
		margin: 0;
	}
	h4 {
		font-size: 36px;
		font-family: 'KoHo';
		font-weight: lighter;
		padding: 15px 0 40px 0;
		margin: 0;
	}

	button {
		width: 312px;
		min-width: 312px;
		height: 87px;
		margin: 8px;
		border-radius: 30px;
		border: none;
		font-family: 'Protest Strike';
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
</style>
