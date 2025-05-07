<script lang="ts">
	import { goto } from '$app/navigation';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';
</script>

<header>
	<div class="logo-container">
		<img src="logo.png" alt="MindSpark logo" class="logo" />
		<button
			class="refresh-button"
			onclick={() => {
				triviaManager.reset();
				goto('/');
			}}>⟳</button
		>
	</div>
</header>

<style>
	header {
		flex-shrink: 0;
		width: 120px;
		height: 80px;
		margin: auto;
		margin-top: 0;
	}

	.logo-container {
		position: relative; /* Tarvitaan, jotta painike voidaan sijoittaa kuvan päälle */
		width: 120px;
		height: 80px;
	}

	.logo {
		width: 100%;
		height: 100%;
		padding: 5px;
	}

	.refresh-button {
		position: absolute;
		top: 50%; /* painike pystysuunnassa */
		left: 50%; /*  painikkeen vaakasuunnassa */
		transform: translate(-50%, -50%); /* painikkeen sijoittaminen keselle */
		background-color: transparent; /* Poistaa taustan */
		border: none; /* Poistaa reunukset */
		width: 120px;
		height: 80px;
		cursor: pointer;
		opacity: 0; /* Tekee painikkeen näkymättömäksi */
	}

	@media only screen and (max-height: 630px) {
		header,
		.logo-container {
			width: 109px;
			height: 79px;
		}
	}
</style>