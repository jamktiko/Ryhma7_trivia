<script lang="ts">
    interface Props {
        text: string;
        onclick?: () => void;
        disabled?: boolean; 
        font?: string;
        fontSize?: string;
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
        disabled = false, // Oletuksena nappi ei ole disabloitu
        color,
        font = 'Protest Strike',
        fontSize = '32px'
    }: Props = $props();
</script>

<button
    class={color}
    style={`font-family: ${font}; --button-font-size: ${fontSize};`}
    onclick={onclick}
    disabled={disabled}>{text}</button
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

    /* Muu olemassa oleva tyyli säilyy ennallaan */
</style>