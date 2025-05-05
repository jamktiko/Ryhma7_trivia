<script lang="ts">
    let ajastin: number = 15; // Ajastin sekunteina
    let kulunutAika: number = 0; // Kulunut aika sekunteina
    let tulos: number = 0;
    let ajastinInterval: ReturnType<typeof setInterval> | null = null;
    let viesti: string = ""; // viesti kun aika loppuu

    import { onDestroy } from 'svelte';

    // Poistetaan automaattinen ajastimen käynnistys
    onDestroy(() => {
        pysaytaAjastin(); // Pysäytetään ajastin, kun komponentti poistetaan
    });

     export function kaynnistaAjastin() {
        pysaytaAjastin(); // Varmistetaan, ettei vanhoja ajastimia ole käynnissä
        ajastin = 15; // Asetetaan ajastin 15 sekuntiin
        kulunutAika = 0;
        viesti = ""; // Nollataan viesti

        ajastinInterval = setInterval(() => {
            if (ajastin > 0) {
                ajastin--;
                kulunutAika++;
                console.log(`Ajastin: ${ajastin} sekuntia jäljellä`);
            } else {
                pysaytaAjastin();
                viesti = "Aika loppui :("; // Päivitetään viesti
                console.log('Ajastin päättyi');
            }
        }, 1000); // Päivitetään ajastinta sekunnin välein
    }

     export function pysaytaAjastin() {
        if (ajastinInterval) {
            clearInterval(ajastinInterval);
            ajastinInterval = null;
        }
    }

   export function laskepisteet (onkovastausoikein: boolean) {
        const maxpisteet = 100;
        const maxaika = 15; // Maksimiaika sekunteina
        const aikasakko = maxpisteet / maxaika; // Pistevähennys joka sekunilta
        const vaaravastaus = 0;

        if (!onkovastausoikein) {
            tulos = vaaravastaus; // Ei pisteitä, jos vastaus on väärin
        } else if (kulunutAika > maxaika) {
            tulos = 0; // Ei pisteitä, jos aika menee yli
        } else {
            tulos = Math.max(0, Math.floor(maxpisteet - kulunutAika * aikasakko)); // Pyöristetään alaspäin
        }

        console.log(`Kulunut aika: ${kulunutAika} sekuntia`);
        console.log(`Lasketut pisteet: ${tulos}`);
    }
</script>

<div>
    <p> {ajastin} sekuntia jäljellä</p>
    
    <p>{viesti}</p> <!-- tähän viesti kun aika loppuu -->
    <button on:click={kaynnistaAjastin}>Käynnistä ajastin</button>
</div>