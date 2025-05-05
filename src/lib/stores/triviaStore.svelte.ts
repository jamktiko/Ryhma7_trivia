// Tyypitys
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
	questions: [] as Question[],
	currentQuestionIndex: 0,
	shuffledAnswers: [] as string[],
	selectedAnswer: null as string | null,
	isAnswerCorrect: null as boolean | null,
	canSelectAnswer: true
});

// Getterit kategoriaa, valittua kategoriaa ja kysymyksiä varten
export const triviaManager = {
	// Palauttaa kaikki kategoriat
	get categories() {
		return triviaObject.categories;
	},
	// Palauttaa valitun kategorian ID:n
	get selectedCategoryId() {
		return triviaObject.selectedCategoryId;
	},
	// Palauttaa kategoria objektin find metodilla, joka vastaa valittua kategoriaa
	// Jos ei löydy, palauttaa undefined
	get selectedCategory() {
		return triviaObject.categories.find(
			(category) => category.id === triviaObject.selectedCategoryId
		);
	},
	// Palauttaa kaikki kysymykset
	get questions() {
		return triviaObject.questions;
	},
	// Palauttaa nykyisen kysymyksen indeksin
	get currentQuestionIndex() {
		return triviaObject.currentQuestionIndex;
	},
	// Palauttaa sekoitetut vastaukset
	get shuffledAnswers() {
		return triviaObject.shuffledAnswers;
	},
	// Palauttaa valitun vastauksen
	get selectedAnswer() {
		return triviaObject.selectedAnswer;
	},
	// Palauttaa vastauksen oikeellisuuden
	get isAnswerCorrect() {
		return triviaObject.isAnswerCorrect;
	},
	// Palauttaa voiko valita vastauksen
	get canSelectAnswer() {
		return triviaObject.canSelectAnswer;
	},
	// Palauttaa nykyisen kysymyksen
	get currentQuestion() {
		return triviaObject.questions[triviaObject.currentQuestionIndex];
	},

	// Sekoittaa vastaukset nykyiselle kysymykselle
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

		// Viive ennen siirtymistä seuraavaan kysymykseen
		setTimeout(() => {
			// Siirtyy seuraavaan kysymykseen, jos mahdollista
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
		}, 1000);
	},

	// Fetchaa datan API:sta ja asettaa sen triviaObjectiin
	async fetchCategory(categoryId: number): Promise<Question[]> {
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
			return data.results;
		} catch (error) {
			console.error('Error fetching category questions:', error);
			triviaObject.questions = [];
			return [];
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
