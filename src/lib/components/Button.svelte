<script lang="ts">
	interface Props {
		text: string;
		onclick?: () => void;
		disabled?: boolean;
		color:
			| 'button1-color'
			| 'ansbutton1-color'
			| 'ansbutton2-color'
			| 'ansbutton3-color'
			| 'ansbutton4-color'
			| 'success-color' // Add these new colors
			| 'danger-color';
	}
	let { text, onclick, disabled = false, color }: Props = $props();
</script>

<!-- Hakasulkeissa oleva teksti propsien importaamista varten eri komponentteihin. -->
<!-- Kertoo mitä buttonin tulisi sisältää -->
<button class={color} {onclick} {disabled}>{text}</button>

<style>
	/* Tyylit tähän!!!! */
	/* :root {
		--body-color: rgba(130, 79, 157, 30%);
		--button1-color: rgba(253, 170, 83, 30%);
		--buttontext-color: #411c5e;
		--ansbutton1-color: rgba(160, 198, 207, 80%);
		--ansbutton2-color: rgba(192, 155, 173, 90%);
		--ansbutton3-color: rgba(65, 28, 94, 30%);
		--ansbutton4-color: rgba(253, 170, 83, 50%);
	} */
	button {
		width: 312px;
		min-width: 312px;
		height: 226px;
		margin: 8px;
		border-radius: 30px;
		border: none;
		font-family: 'Protest Strike';
		font-size: 32px;
		color: var(--buttontext-color);
		box-shadow:
			2px 2px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}
	.button1-color {
		background-color: var(--button1-color);
	}

	.ansbutton1-color {
		background-color: var(--ansbutton1-color);
	}

	.ansbutton2-color {
		background-color: var(--ansbutton2-color);
	}

	.ansbutton3-color {
		background-color: var(--ansbutton3-color);
	}

	.ansbutton4-color {
		background-color: var(--ansbutton4-color);
	}
	.success-color {
		background-color: rgba(46, 204, 113, 0.8); /* Green */
		color: white;
	}

	.danger-color {
		background-color: rgba(231, 76, 60, 0.8); /* Red */
		color: white;
	}
</style>
