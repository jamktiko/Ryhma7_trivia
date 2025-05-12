<script lang="ts">
	import { goto } from '$app/navigation';
	import { triviaManager } from '$lib/stores/triviaStore.svelte';
	import { startMusic, stopMusic } from '$lib/stores/backgroundmusic';

	let isSoundOn = $state(false); // Ääniasetuksen tila
	// Käynnistä musiikki
	function toggleSound() {
		isSoundOn = !isSoundOn;
		if (isSoundOn) {
			startMusic();
		} else {
			stopMusic();
		}
	}
	// Function for home button
	function goToHome() {
		triviaManager.reset();
		goto('/');
	}
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
			<span class="tooltiptext">Main menu</span>
		</div>
	</div>
	<!-- Home button -->
	<button class="home-icon-button" onclick={goToHome} aria-label="Go to main menu">
		<span class="material-symbols-outlined"> home </span>
		<span class="home-tooltip">Main menu</span>
	</button>
	<!-- Ääniasetuksen nappi -->
	<button class="sound-icon-button" onclick={toggleSound} aria-label="Toggle sound">
		<span class="material-symbols-outlined">
			{isSoundOn ? 'volume_up' : 'volume_off'}
		</span>
		<span class="sound-tooltip">{isSoundOn ? 'Sound ON' : 'Sound OFF'}</span>
	</button>
</header>

<style>
	header {
		flex-shrink: 0;
		width: 100%; /* Expand header width to allow for right corner positioning */
		height: 80px;
		margin: 0;
		position: relative; /* Enable absolute positioning of children */
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
	.sound-icon-button {
		background-color: transparent; /* Remove background */
		border: none;
		color: var(--buttontext-color);
		width: 40px;
		height: 40px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute; /* Position absolutely */
		top: 10px; /* Distance from top */
		right: 10px; /* Distance from right */
		z-index: 10; /* Ensure it's above other elements */
	}
	.sound-icon-button .material-symbols-outlined {
		font-size: 40px; /* Increase icon size */
	}
	.sound-icon-button:hover {
		opacity: 0.9;
	}

	.sound-tooltip {
		visibility: hidden;
		background-color: var(--button2-color);
		color: var(--buttontext-color);
		text-align: center;
		border-radius: 6px;
		padding: 5px;
		position: absolute;
		z-index: 11;
		bottom: 125%;
		left: 50%;
		transform: translateX(-50%);
		font-family: 'KoHo', sans-serif;
		font-size: 14px;
		white-space: nowrap;
	}

	.sound-icon-button:hover .sound-tooltip {
		visibility: visible;
	}
	.home-icon-button {
		background-color: transparent;
		border: none;
		color: var(--buttontext-color);
		width: 40px;
		height: 40px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 10px;
		right: 60px; /* Position to left of sound button */
		z-index: 10;
	}

	.home-icon-button .material-symbols-outlined {
		font-size: 40px; /* Match sound button size */
	}
	.home-icon-button:hover {
		opacity: 0.9;
	}

	.home-tooltip {
		visibility: hidden;
		background-color: var(--button2-color);
		color: var(--buttontext-color);
		text-align: center;
		border-radius: 6px;
		padding: 5px;
		position: absolute;
		z-index: 11;
		bottom: 125%;
		left: 50%;
		transform: translateX(-50%);
		font-family: 'KoHo', sans-serif;
		font-size: 14px;
		white-space: nowrap;
	}

	.home-icon-button:hover .home-tooltip {
		visibility: visible;
	}

	@media only screen and (max-width: 600px) {
		.tooltiptext {
			display: none;
		}
	}
	@media only screen and (max-height: 630px) {
		/* Keep header full width but adjust logo container */
		.logo-container {
			width: 109px;
			height: 79px;
		}

		/* Don't change header width - it should stay 100% */
		header {
			height: 79px; /* Match the height of logo container */
		}

		/* Ensure buttons stay properly positioned */
		.home-icon-button,
		.sound-icon-button {
			top: 5px; /* Move slightly higher */
		}

		/* Optionally reduce button size for better fit */
		.home-icon-button .material-symbols-outlined,
		.sound-icon-button .material-symbols-outlined {
			font-size: 35px;
		}
	}
	@media only screen and (max-width: 480px) {
		.home-icon-button .material-symbols-outlined,
		.sound-icon-button .material-symbols-outlined {
			font-size: 25px;
		}
		.home-icon-button {
			right: 40px;
		}
	}
</style>
