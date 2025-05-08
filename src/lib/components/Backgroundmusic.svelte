<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    export let src = "/sound/jazz-lounge-elevator-music-332339.wav";
    export let volume: number = 0.5;

    let audio: HTMLAudioElement;
    let isPlaying = false;

    const startMusic = () => {
        if (audio) {
            audio.volume = Math.min(Math.max(volume, 0), 1);
            audio.loop = true;
            audio.play()
                .then(() => {
                    isPlaying = true;
                })
                .catch((error) => {
                    console.error('Musiikin toisto epäonnistui:', error);
                });
        }
    };

    onMount(() => {
        startMusic(); // Käynnistä musiikki automaattisesti
    });

    onDestroy(() => {
        if (audio) {
            audio.pause();
        }
    });
</script>

<audio bind:this={audio} src={src}></audio>