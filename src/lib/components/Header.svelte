<script lang="ts">
	function sivunpaivitus() {
		window.location.reload(); // Päivittää sivun
	}
</script>

<header>
	<div class="logo-container">
		<img src="logo.png" alt="MindSpark logo" class="logo" />
		<button class="refresh-button" on:click={sivunpaivitus}>⟳</button>
	</div>
</header>

<style>
	header {
		width: 160px;
		height: 120px;
		display: flex;
		margin: auto;
		justify-content: center;
	}

	.logo-container {
		position: relative; /* Tarvitaan, jotta painike voidaan sijoittaa kuvan päälle */
		width: 150px;
		height: 110px;
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
		width: 150px;
		height: 110px;
		cursor: pointer;
		opacity: 0; /* Tekee painikkeen näkymättömäksi */
	}

	@media only screen and (max-height: 700px) {
		header,
		.logo-container {
			width: 174px;
			height: 126px;
		}
	}

	@media only screen and (max-height: 630px) {
		header,
		.logo-container {
			width: 109px;
			height: 79px;
		}
	}
</style>
