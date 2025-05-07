<script lang="ts">
	import { goto } from '$app/navigation';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';
</script>

<header>
	<div class="tooltip">
		<div class="logo-container">
			<img src="logo.png" alt="MindSpark logo" class="logo" />
			<button
				class="refresh-button"
				onclick={() => {
					triviaManager.reset();
					goto('/');
				}}
				>⟳
			</button>
			<span class="tooltiptext">Back to start</span>
		</div>
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
		padding: 5px;
	}

	.logo {
		width: 100%;
		height: 100%;
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

	.tooltip {
		position: relative;
		display: inline-block;
		font-family: 'KoHo', sans-serif;
		font-weight: bold;
	}

	.tooltip .tooltiptext {
		visibility: hidden;
		width: 120px;
		background-color: var(--button1-color);
		color: var(--buttontext-color);
		text-align: center;
		border-radius: 6px;
		padding: 5px 0;
		position: absolute;
		top: 30px;
		left: 110%;
	}

	.tooltip .tooltiptext::after {
		content: '';
		position: absolute;
		top: 50%;
		right: 100%;
		margin-top: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent var(--button1-color) transparent transparent;
	}
	.tooltip:hover .tooltiptext {
		visibility: visible;
	}

	@media only screen and (max-height: 630px) {
		header,
		.logo-container {
			width: 109px;
			height: 79px;
		}
	}
</style>