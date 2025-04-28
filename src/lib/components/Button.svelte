<script lang="ts">
	interface Props {
		text: string;
		onclick: (...args: any[]) => void;
		disabled?: boolean;
	}
	let { text, onclick, disabled = false }: Props = $props();
</script>

<!-- Hakasulkeissa oleva teksti propsien importaamista varten eri komponentteihin. -->
<!-- Kertoo mitä buttonin tulisi sisältää -->
<button {onclick} {disabled}>{text}</button>

<style>
	/* Tyylit tähän!!!! */
</style>
