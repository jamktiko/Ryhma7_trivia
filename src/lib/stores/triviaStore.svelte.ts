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
	canSelectAnswer: true
});

//Kaikki consolelogit testaamista varten

// Getterit kategoriaa, valittua kategoriaa ja kysymyksiä varten
export const triviaManager = {
	get categories() {
		return triviaObject.categories; // Palauttaa kaikki kategoriat
	},
	get selectedCategoryId() {
		return triviaObject.selectedCategoryId; // Palauttaa valitun kategorian ID:n
	},
	get selectedCategory() {
		return triviaObject.categories.find(
			(category) => category.id === triviaObject.selectedCategoryId // Palauttaa kategoria objektin find metodilla, joka vastaa valittua kategoriaa
			// Jos ei löydy, palauttaa undefined
		);
	},
	get questions() {
		return triviaObject.questions; // Palauttaa kaikki kysymykset
	},
	get currentQuestionIndex() {
		return triviaObject.currentQuestionIndex; // Palauttaa nykyisen kysymyksen indeksin
	},
	get shuffledAnswers() {
		return triviaObject.shuffledAnswers; // Palauttaa sekoitetut vastaukset
	},
	get selectedAnswer() {
		return triviaObject.selectedAnswer; // Palauttaa valitun vastauksen
	},
	get isAnswerCorrect() {
		return triviaObject.isAnswerCorrect; // Palauttaa vastauksen oikeellisuuden
	},
	get canSelectAnswer() {
		return triviaObject.canSelectAnswer; // Palauttaa voiko valita vastauksen
	},
	get currentQuestion() {
		return triviaObject.questions[triviaObject.currentQuestionIndex]; // Palauttaa nykyisen kysymyksen
	},
	get isCategorySelected() {
		return triviaObject.categorySelected; // Palauttaa onko kategoria valittu
	},

	// Sekoittaa vastaukset nykyiselle kysymykselle, jotta oikea vastaus ei ole aina ensimmäisenä
	shuffleAnswers() {
		const currentQuestion = triviaObject.questions[triviaObject.currentQuestionIndex];
		if (!currentQuestion) return;
		//Consolelogaa kategorian ja kysymyksen
		console.log(`Category: ${currentQuestion.category}`);
		console.log(
			`Question ${triviaObject.currentQuestionIndex + 1}/${triviaObject.questions.length}`
		);
		console.log(`Question: ${currentQuestion.question}`);
		const allAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
		triviaObject.shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
		console.log('Sekoitettu vastaukset:', triviaObject.shuffledAnswers);
	},

	// Käsittelee vastauksen valinnan
	selectAnswer(answer: string) {
		// Estää uuden vastauksen valinnan odotuksen aikana
		if (!triviaObject.canSelectAnswer) return;
		const currentQuestion = triviaObject.questions[triviaObject.currentQuestionIndex];
		const isCorrect = answer === currentQuestion.correct_answer;
		// Asettaa valitun vastauksen ja sen oikeellisuuden
		triviaObject.selectedAnswer = answer;
		triviaObject.isAnswerCorrect = isCorrect;
		triviaObject.canSelectAnswer = false;
		console.log(`${answer}`);
		console.log(`Correct: ${isCorrect}`);

		setTimeout(() => {
			// Viive ennen siirtymistä seuraavaan kysymykseen
			if (triviaObject.currentQuestionIndex < triviaObject.questions.length - 1) {
				triviaObject.currentQuestionIndex++;
				this.shuffleAnswers();
			} else {
				console.log('completed!');
			}
			// Nollaa tilan seuraavaa kysymystä varten
			triviaObject.selectedAnswer = null;
			triviaObject.isAnswerCorrect = null;
			triviaObject.canSelectAnswer = true;
		}, 1500);
	},

	// Fetchaa datan API:sta ja asettaa sen triviaObjectiin
	// Tämä funktio "optimoitu" AI:n avulla. Käytännössä yhdistetty 2 aikasempaa funktiota.
	async selectCategory(categoryId: number): Promise<boolean> {
		console.log(`Valittu kategoria: ${categoryId}`);
		try {
			// Nollaa kysymyksen indeksin uuden kategorian hakemisen yhteydessä
			triviaObject.currentQuestionIndex = 0;
			triviaObject.selectedCategoryId = categoryId;
			const response = await fetch(
				`https://opentdb.com/api.php?amount=20&category=${categoryId}&difficulty=medium&type=multiple`
			);
			const data = await response.json();
			triviaObject.questions = data.results;
			// Sekoittaa vastaukset ensimmäiselle kysymykselle
			if (data.results.length > 0) {
				this.shuffleAnswers();
			}
			// Asettaa kategorian valituksi
			triviaObject.categorySelected = true;
			console.log(`Haettu ${data.results.length} kysymystä kategorialle ${categoryId}`);
			return true;
		} catch (error) {
			console.error('Haku ei onnistunut', error);
			triviaObject.questions = [];
			triviaObject.categorySelected = false;
			return false;
		}
	},

	// Resettaa kaiken tarvittavan uutta peliä varten
	reset() {
		triviaObject.selectedCategoryId = null;
		triviaObject.questions = [];
		triviaObject.currentQuestionIndex = 0;
		triviaObject.shuffledAnswers = [];
		triviaObject.selectedAnswer = null;
		triviaObject.isAnswerCorrect = null;
		triviaObject.canSelectAnswer = true;
	}
};
