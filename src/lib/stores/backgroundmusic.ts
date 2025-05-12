let audio: HTMLAudioElement | null = null;
const audioSrc = '/sound/jazz-lounge-elevator-music-332339.wav';

export function startMusic() {
	if (!audio) {
		audio = new Audio(audioSrc);
		audio.loop = true;
		audio.volume = 0.1;
	}
	audio.play().catch((err) => console.error('Musiikin toisto epäonnistui:', err));
}

export function stopMusic() {
	if (audio) {
		audio.pause();
	}
}
