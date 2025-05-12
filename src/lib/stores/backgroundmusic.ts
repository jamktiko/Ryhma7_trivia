// Muuttuja, joka tallentaa HTMLAudioElement-olion. Aluksi se on null, koska musiikkia ei ole vielä luotu tai toistettu.
let audio: HTMLAudioElement | null = null;

// Äänitiedoston polku, joka sisältää taustamusiikin. Tämä tiedosto toistetaan, kun musiikki käynnistetään.
const audioSrc = "/sound/jazz-lounge-elevator-music-332339.wav";

// Funktio, joka käynnistää taustamusiikin.
export function startMusic() {
    // Tarkistetaan, onko audio-objekti jo olemassa. Jos ei, luodaan uusi Audio-objekti.
    if (!audio) {
        audio = new Audio(audioSrc); // Luodaan uusi Audio-objekti käyttäen määriteltyä äänitiedostoa.
        audio.loop = true; // Asetetaan musiikki toistumaan jatkuvasti (loop).
        audio.volume = 0.3; // Asetetaan äänenvoimakkuus 30 %:iin maksimista.
    }
    // Käynnistetään musiikin toisto. Jos toisto epäonnistuu (esim. selaimen rajoitusten vuoksi), virhe tulostetaan konsoliin.
    audio.play().catch((err) => console.error("Musiikin toisto epäonnistui:", err));
}

// Funktio, joka pysäyttää taustamusiikin.
export function stopMusic() {
    // Tarkistetaan, onko audio-objekti olemassa. Jos on, pysäytetään musiikin toisto.
    if (audio) {
        audio.pause(); // Pysäytetään musiikin toisto.
    }
}
