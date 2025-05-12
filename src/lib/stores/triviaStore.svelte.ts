//categories: Sports, History, Geography, Animals
//selectedCategoryId: Valitun kategorian id
//categorySelected: Seuraa onko kategoria valittu
//questions: Taulukko fetchatuista kysymyksistä
//currentQuestionIndex: Seuraa mikä kysymys on menossa
//currentQuestion: Palauttaa nykyisen kysymyksen
//shuffledAnswers: Sekoitettu taulukko vastauksista
//selectedAnswer: Valittu vastaus
//isAnswerCorrect: Seuraa onko valittu vastaus oikea
//canSelectAnswer: Seuraa onko vastauksen valinta mahdollista
import { goto } from '$app/navigation';

interface Question {
	category: string;
	type: string;
	difficulty: string;
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
}

const triviaObject = $state({
	categories: [
		{ id: 21, name: 'Sports' },
		{ id: 23, name: 'History' },
		{ id: 22, name: 'Geography' },
		{ id: 27, name: 'Animals' }
	],
	selectedCategoryId: null as number | null,
	categorySelected: false,
	questions: [] as Question[],
	currentQuestionIndex: 0,
	shuffledAnswers: [] as string[],
	selectedAnswer: null as string | null,
	isAnswerCorrect: null as boolean | null,
	canSelectAnswer: true,
	score: 0,
	correctAnswers: 0,
	incorrectAnswers: 0,
	totalAnswers: 0,
	highScores: {} as Record<number, number>, // jokaiselle kategorialle oma highscore
	ajastin: 0,
	progress: 0
});

let ajastinInterval: ReturnType<typeof setInterval> | null = null;

function kaynnistaAjastin() {
	pysaytaAjastin(); // Varmistetaan, ettei vanhoja ajastimia ole käynnissä
	triviaObject.ajastin = 20; // Asetetaan ajastin haluttuun sekuntiin
	triviaObject.progress = 0; // Nollataan progress bar

	ajastinInterval = setInterval(() => {
		if (triviaObject.ajastin > 0) {
			triviaObject.ajastin--; // Vähennetään ajastinta yhdellä sekunnilla
			triviaObject.progress = (triviaObject.ajastin / 20) * 100; // Päivitetään progress bar
		} else {
			pysaytaAjastin(); // Pysäytetään ajastin, kun aika loppuu
			if (triviaObject.canSelectAnswer) {
				triviaManager.timeOut();
			}
		}
	}, 1000); // Päivitetään ajastinta sekunnin välein
}

function pysaytaAjastin() {
	if (ajastinInterval) {
		clearInterval(ajastinInterval); // Pysäytetään ajastin
		ajastinInterval = null;
	}
}

function laskepisteet(onkoVastausOikein: boolean) {
	const maxPisteet = 15; // Täydet pisteet
	const minAjastin = 0; // Aika nollaantuu

	if (!onkoVastausOikein) {
		return 0; // Ei pisteitä, jos vastaus on väärin
	} else if (triviaObject.ajastin <= minAjastin) {
		return 0; // Ei pisteitä, jos aika on loppunut
	} else if (triviaObject.ajastin > 14) {
		return maxPisteet; // Täydet pisteet, jos aikaa on yli 14 sekuntia
	} else {
		// Lasketaan pisteet ajan perusteella, mitä nopeammin vastaa, sitä enemmän pisteitä
		return Math.max(0, triviaObject.ajastin); // Pisteet vastaavat jäljellä olevaa aikaa
	}
}

// Getterit
export const triviaManager = {
	get totalAnswers() {
		return triviaObject.totalAnswers;
	},
	get ajastin() {
		return triviaObject.ajastin;
	},
	get score() {
		return triviaObject.score;
	},
	get highScore() {
		return triviaObject.highScores;
	},
	get correctAnswers() {
		return triviaObject.correctAnswers;
	},
	get incorrectAnswers() {
		return triviaObject.incorrectAnswers;
	},
	get categories() {
		return triviaObject.categories;
	},
	get selectedCategoryId() {
		return triviaObject.selectedCategoryId;
	},
	get selectedCategory() {
		return triviaObject.categories.find(
			(category) => category.id === triviaObject.selectedCategoryId
		);
	},
	get questions() {
		return triviaObject.questions;
	},
	get currentQuestionIndex() {
		return triviaObject.currentQuestionIndex;
	},
	get shuffledAnswers() {
		return triviaObject.shuffledAnswers;
	},
	get selectedAnswer() {
		return triviaObject.selectedAnswer;
	},
	get isAnswerCorrect() {
		return triviaObject.isAnswerCorrect;
	},
	get canSelectAnswer() {
		return triviaObject.canSelectAnswer;
	},
	get currentQuestion() {
		return triviaObject.questions[triviaObject.currentQuestionIndex];
	},
	get isCategorySelected() {
		return triviaObject.categorySelected;
	},

	shuffleAnswers() {
		//sekoittaa vastaukset, että ovat satunnaisessa järjestyksessä
		const currentQuestion = triviaObject.questions[triviaObject.currentQuestionIndex];
		if (!currentQuestion) return;
		const allAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
		triviaObject.shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
		kaynnistaAjastin(); // Käynnistää ajastimen uuden kysymyksen alkaessa
	},

	timeOut() {
		triviaObject.selectedAnswer = 'TIMEOUT'; // Asetetaan valituksi vastaukseksi TIMEOUT, jotta voidaan tulostaa eri teksti ehdollisesti
		triviaObject.isAnswerCorrect = false; // Asetetaan onko vastaus oikea falseksi
		triviaObject.canSelectAnswer = false; // Estetään vastausten valinta
		setTimeout(() => {
			//Timeout, jotta tulosviesti kerkee näkyä
			if (triviaObject.currentQuestionIndex < triviaObject.questions.length - 1) {
				triviaObject.currentQuestionIndex++;
				this.shuffleAnswers();
			} else {
				goto(
					// Reititys loppunäytölle jos ollaan viimeisessä kysymyksessä
					`/loppunaytto?categoryId=${triviaObject.selectedCategoryId}&highScore=${
						triviaObject.highScores[triviaObject.selectedCategoryId!] || 0
					}`
				);
			}
			triviaObject.selectedAnswer = null;
			triviaObject.isAnswerCorrect = null;
			triviaObject.canSelectAnswer = true;
		}, 1000);
	},

	selectAnswer(answer: string) {
		if (!triviaObject.canSelectAnswer) return; // Tarkistetaan, onko vastaus valittavissa
		const currentQuestion = triviaObject.questions[triviaObject.currentQuestionIndex]; // Haetaan nykyinen kysymys
		const isCorrect = answer === currentQuestion.correct_answer; // Tarkistetaan onko vastaus oikea

		if (isCorrect) {
			// Jos vastaus on oikea ->
			triviaObject.correctAnswers++; // Kasvatetaan oikeiden vastausten määrää
			const pisteet = laskepisteet(true); // Lasketaan pisteet
			triviaObject.score += pisteet; // Lisätään pisteet kokonaispisteisiin
			if (triviaObject.score > (triviaObject.highScores[triviaObject.selectedCategoryId!] || 0)) {
				triviaObject.highScores[triviaObject.selectedCategoryId!] = triviaObject.score; // Päivitetään highscore
			}
		} else {
			// Jos vastaus on väärä ->
			triviaObject.incorrectAnswers++; // Kasvatetaan väärien vastausten määrää
			// laskepisteet(false); // Ei pisteitä väärästä vastauksesta
		}

		triviaObject.selectedAnswer = answer; // Asetetaan valittu vastaus
		triviaObject.isAnswerCorrect = isCorrect; // Asetetaan onko vastaus oikea
		triviaObject.canSelectAnswer = false; // Estetään vastausten valinta
		pysaytaAjastin(); // Pysäytetään ajastin, kun vastaus on valittu

		if (triviaObject.currentQuestionIndex < triviaObject.questions.length - 1) {
			triviaObject.totalAnswers++;
		} // Kasvatetaan vastausten määrää vain, jos ei olla viimeisessä kysymyksessä

		if (triviaObject.currentQuestionIndex >= triviaObject.questions.length - 1) {
			setTimeout(() => {
				// Jos ollaan viimeisessä kysymyksessä ->
				triviaObject.totalAnswers = 20;
				setTimeout(() => {
					goto(
						`/loppunaytto?categoryId=${triviaObject.selectedCategoryId}&highScore=${
							triviaObject.highScores[triviaObject.selectedCategoryId!] || 0
						}`
					);
				}, 1000); // Timeout, jotta loadingscreen ehtii tulla näkyviin
			}, 1000); // Timeout, että viimeisin vastauksen tulos ehtii näkyä
		} else {
			setTimeout(() => {
				// Resettaamista seuraavaa kysymystä varten
				triviaObject.currentQuestionIndex++;
				this.shuffleAnswers();
				triviaObject.selectedAnswer = null;
				triviaObject.isAnswerCorrect = null;
				triviaObject.canSelectAnswer = true;
			}, 1000); // Kysymyksien välinen timeout
		}
	},

	async selectCategory(categoryId: number): Promise<boolean> {
		console.log(`Valittu kategoria: ${categoryId}`);
		try {
			triviaObject.currentQuestionIndex = 0; // Nollataan nykyinen kysymys
			triviaObject.selectedCategoryId = categoryId; //Asetetaan kategoria id fetchausta varten
			const response = await fetch(
				`https://opentdb.com/api.php?amount=20&category=${categoryId}&difficulty=medium&type=multiple`
			);
			const data = await response.json();
			triviaObject.questions = data.results || []; // Varmistaa, että data.results on taulukko
			this.shuffleAnswers(); // Kutsutaan shuffleAnswers funktio, jotta se sekoittaa vastaukset
			triviaObject.categorySelected = true; // Asetetaan kategoria valituksi
			console.log(`Haettu ${data.results.length} kysymystä kategorialle ${categoryId}`);
			return true; // Palautetaan boolean arvo CategorySelector komponenttia varten, jotta saadaan ehdollista tulostusta.
		} catch (error) {
			console.error('Haku ei onnistunut', error);
			triviaObject.questions = [];
			triviaObject.categorySelected = false;
			return false;
		}
	},

	async playAgain(selectedCategoryId: number) {
		pysaytaAjastin();
		triviaObject.categorySelected = true;
		triviaObject.selectedCategoryId = selectedCategoryId;
		triviaObject.questions = [];
		triviaObject.currentQuestionIndex = 0;
		triviaObject.shuffledAnswers = [];
		triviaObject.selectedAnswer = null;
		triviaObject.isAnswerCorrect = null;
		triviaObject.canSelectAnswer = true;
		triviaObject.score = 0;
		triviaObject.correctAnswers = 0;
		triviaObject.incorrectAnswers = 0;
		triviaObject.totalAnswers = 0;
		//Tämä litania resettaa pelin lukuunottamatta kategoriaa
		// Tarkennukset propertyille reset() funktiossa
		// Ei toiminut joka kerta jos kutsuu suoraan reset() funktiota
		// ja asetti sen jälkeen vielä erikseen categorySelected trueksi.

		try {
			// Fetchataan kysymykset uudestaan
			const response = await fetch(
				`https://opentdb.com/api.php?amount=20&category=${selectedCategoryId}&difficulty=medium&type=multiple`
			);
			const data = await response.json();
			triviaObject.questions = data.results || []; // Varmistetaan, että data.results on taulukko
			this.shuffleAnswers(); // Kutsutaan shuffleAnswers funktio, jotta se sekoittaa vastaukset
			goto('/'); //Reititys takaisin pelinäytölle
		} catch (error) {
			console.error('Failed to fetch questions for replay', error);
			goto('/'); //Reititys takaisin alkunäytölle, jos fetch epäonnistuu
		}
	},

	reset() {
		pysaytaAjastin();
		triviaObject.selectedCategoryId = null; //Kategoria nollataan
		triviaObject.questions = []; //Kaikki kysymykset nollataan
		triviaObject.currentQuestionIndex = 0; //Kysymys nollataan
		triviaObject.shuffledAnswers = []; //Vastaukset nollataan
		triviaObject.selectedAnswer = null; //Valittu vastaus nollataan
		triviaObject.isAnswerCorrect = null; //Oikea vastaus nollataan
		triviaObject.canSelectAnswer = true; //Valinta mahdollistetaan
		triviaObject.score = 0; //Pisteet nollataan
		triviaObject.correctAnswers = 0; //Oikeiden vastausten määrä nollataan
		triviaObject.incorrectAnswers = 0; //Väärien vastausten määrä nollataan
		triviaObject.categorySelected = false; //Kategoria valinta nollataan
		triviaObject.progress = 0; //Progress bar nollataan
		triviaObject.totalAnswers = 0; //Vastausten määrä nollataan
	}
};
