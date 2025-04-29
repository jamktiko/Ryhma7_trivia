<script lang="ts">
	interface Props {
		text: string;
		onclick?: () => void;
		disabled?: boolean;
	}
	let { text, onclick, disabled = false }: Props = $props();
</script>

<!-- Hakasulkeissa oleva teksti propsien importaamista varten eri komponentteihin. -->
<!-- Kertoo mitä buttonin tulisi sisältää -->
<button {onclick} {disabled}>{text}</button>

<style>
	/* Tyylit tähän!!!! */
	@import url('https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap');
	button {
		width: 312px;
		min-width: 312px;
		height: 226px;
		background-color: var(--button1-color);
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
</style>
