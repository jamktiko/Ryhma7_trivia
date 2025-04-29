<script lang="ts">
    let ajastin: number = 0; // Ajastin sekunteina
    let kulunutAika: number = 0; // Kulunut aika sekunteina
    let tulos: number = 0;
    let ajastinInterval: ReturnType<typeof setInterval> | null = null;

    import { onMount, onDestroy } from 'svelte';

    onMount(() => {
        kaynnistaAjastin(); // Ajastin käynnistetään automaattisesti
    });

    onDestroy(() => {
        pysaytaAjastin(); // Pysäytetään ajastin, kun komponentti poistetaan
    });

    function kaynnistaAjastin() {
        pysaytaAjastin(); // Varmistetaan, ettei vanhoja ajastimia ole käynnissä
        ajastin = 15; // Asetetaan ajastin 15 sekuntiin
        kulunutAika = 0;

        ajastinInterval = setInterval(() => {
            if (ajastin > 0) {
                ajastin--;
                kulunutAika++;
                console.log(`Ajastin: ${ajastin} sekuntia jäljellä`);
            } else {
                pysaytaAjastin();
                console.log('Ajastin päättyi');
            }
        }, 1000); // Päivitetään ajastinta sekunnin välein
    }

    function pysaytaAjastin() {
        if (ajastinInterval) {
            clearInterval(ajastinInterval);
            ajastinInterval = null;
        }
    }

    function laskepisteet(onkovastausoikein: boolean) {
    const maxpisteet = 100;
    const maxaika = ajastin; // vastausaika sekunteina
    const aikasakko = maxpisteet / maxaika; // pistevähennys joka sekunilta
    const vaaravastaus = 0;

    if (!onkovastausoikein) {
        tulos = vaaravastaus; // ei pisteitä jos vastaus väärin
    } else if (kulunutAika > maxaika) {
        tulos = 0; // ei pisteitä, jos aika menee yli
    } else {
        tulos = Math.max(0, Math.floor(maxpisteet - kulunutAika * aikasakko)); // Pyöristetään alaspäin
    }

    console.log(`Kulunut aika: ${kulunutAika} sekuntia`);
    console.log(`Lasketut pisteet: ${tulos}`);
} 
</script>

<div>
    <p>Ajastin: {ajastin} sekuntia jäljellä</p>
    <p>Kulunut aika: {kulunutAika} sekuntia</p>
    <button on:click={() => laskepisteet(true)}>Laske pisteet (oikea vastaus)</button>
    <button on:click={() => laskepisteet(false)}>Laske pisteet (väärä vastaus)</button>
    
    
</div>