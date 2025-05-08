<script lang="ts">
	interface Props {
		text: string;
		onclick?: () => void;
		disabled?: boolean;
		font?: string;
		fontSize?: string;
		sound?: string; // New prop for sound file path
		color:
			| 'button1-color'
			| 'button2-color'
			| 'ansbutton1-color'
			| 'ansbutton2-color'
			| 'ansbutton3-color'
			| 'ansbutton4-color'
			| 'correctans-color'
			| 'wrongans-color';
	}
	let {
		text,
		onclick,
		disabled = false,
		color,
		font = 'Protest Strike',
		fontSize = '32px',
		sound = '' // Default to no sound
	}: Props = $props();

	// Create a click handler that plays sound and calls the original onclick function
	function handleClick() {
		// Play sound if provided
		if (sound) {
			const audio = new Audio(sound);
			audio.volume = 0.5; // Set volume to 50%
			audio.play().catch((err) => console.error('Error playing sound:', err));
		}

		// Call the original onclick handler if provided
		if (onclick) {
			onclick();
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

	@media only screen and (max-width: 658px) {
		button {
			width: 45%;
			min-width: 150px;
			height: 128px;
			font-size: calc(var(--button-font-size) * 0.85);
		}
	}

	@media only screen and (max-width: 412px) {
		button {
			width: 45%;
			min-width: 150px;
			height: 128px;
			font-size: calc(var(--button-font-size) * 0.68);
		}
	}
</style>
