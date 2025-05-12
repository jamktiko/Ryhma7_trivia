<script lang="ts">
	interface Props {
		text: string;
		onclick?: () => void;
		disabled?: boolean;
		font?: string;
		fontSize?: string;
		sound?: string; // äänen tiedostopolku
		color:
			| 'button1-color'
			| 'button2-color'
			| 'button3-color'
			| 'ansbutton1-color'
			| 'ansbutton2-color'
			| 'ansbutton3-color'
			| 'ansbutton4-color'
			| 'correctans-color'
			| 'wrongans-color'
			| 'correct-answer-highlight';
	}
	let {
		text,
		onclick,
		disabled = false,
		color,
		font = 'Protest Strike',
		fontSize = '32px',
		sound = '' // asetetaan oletusarvo tyhjäksi.  Tekee komponentista joustavamman ja estää virheitä tilanteissa, joissa ääntä ei ole määritelty
	}: Props = $props();

	function handleClick() {  // klikkaustapahtuman käsittelijä, joka suorittaa äänen toistaminen ja määritellyn onclick-toiminnon suorittamisen.
		if (sound) {   // tarkistetaan, onko sound-muuttujalle määritelty arvo. 
			const audio = new Audio(sound);
			audio.volume = 0.3;  //  Äänenvoimakkuus asetetaan arvoon 0.5, mikä tarkoittaa 50 % maksimivoimakkuudesta
			audio.play().catch((err) => console.error('Error playing sound:', err)); //Tämän jälkeen kutsutaan audio.play()-metodia äänen toistamiseksi
		}                                                                             //.catch()-metodia käytetään mahdollisten virheiden käsittelemiseen.
		if (onclick) {  // tarkistetaan, onko onclick-funktio määritelty. Jos se on, funktio kutsutaan.
			onclick();  //mahdollistaa sen, että painikkeen klikkaus voi suorittaa ulkoisesti määritellyn toiminnon
		}
	}
</script>

<button
	class={color}
	style={`font-family: ${font}; --button-font-size: ${fontSize};`}
	onclick={handleClick}
	{disabled}>{text}</button
>

<style>
	button {
		width: 272px;
		min-width: 272px;
		height: 128px;
		margin: 8px;
		border-radius: 30px;
		border: none;
		font-size: var(--button-font-size);
		color: var(--buttontext-color);
		box-shadow:
			2px 2px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}

	.button1-color {
		background-color: var(--button1-color);
	}

	.button1-color:hover {
		cursor: pointer;
		background-color: rgba(253, 170, 83, 40%);
		box-shadow:
			1px 1px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}
	.button2-color {
		background-color: var(--button2-color);
	}

	.button2-color:hover {
		cursor: pointer;
		background-color: rgba(253, 170, 83, 25%);
		box-shadow:
			1px 1px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}
	.button3-color {
		background-color: var(--button3-color);
	}

	.button3-color:hover {
		cursor: pointer;
		background-color: rgba(253, 171, 83, 70%);
		box-shadow:
			1px 1px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}

	.ansbutton1-color {
		background-color: var(--ansbutton1-color);
	}

	.ansbutton1-color:hover {
		cursor: pointer;
		background-color: rgba(160, 198, 207);
		box-shadow:
			1px 1px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}

	.ansbutton2-color {
		background-color: var(--ansbutton2-color);
	}

	.ansbutton2-color:hover {
		cursor: pointer;
		background-color: rgba(192, 155, 173);
		box-shadow:
			1px 1px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}

	.ansbutton3-color {
		background-color: var(--ansbutton3-color);
	}

	.ansbutton3-color:hover {
		cursor: pointer;
		background-color: rgba(65, 28, 94, 35%);
		box-shadow:
			1px 1px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}

	.ansbutton4-color {
		background-color: var(--ansbutton4-color);
	}

	.ansbutton4-color:hover {
		cursor: pointer;
		background-color: rgba(253, 170, 83, 60%);
		box-shadow:
			1px 1px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}

	.wrongans-color {
		background-color: var(--wrongans-color);
	}
	.wrongans-color:hover {
		background-color: var(--wrongans-color);
	}

	.correctans-color {
		background-color: var(--correctans-color);
	}
	.correctans-color:hover {
		background-color: var(--correctans-color);
	}

	@keyframes blink-green {
		0% {
			background-color: #86e77f68;
		}
		50% {
			background-color: #86e77fd5;
		}
		100% {
			background-color: #86e77f68;
		}
	}

	.correct-answer-highlight {
		animation: blink-green 1s infinite;
	}

	@media only screen and (max-width: 658px) {
		button {
			width: 40%;
			min-width: 150px;
			height: 128px;
			font-size: calc(var(--button-font-size) * 0.85);
		}
	}

	@media only screen and (max-width: 412px) {
		button {
			width: 35%;
			min-width: 110px;
			height: 120px;
			font-size: calc(var(--button-font-size) * 0.68);
		}
	}
</style>
