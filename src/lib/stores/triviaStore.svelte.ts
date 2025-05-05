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
	canSelectAnswer: true,
	score: 0,
	correctAnswers: 0,
	incorrectAnswers: 0,
	highScore: 0
});

// Getterit kategoriaa, valittua kategoriaa ja kysymyksiä varten
export const triviaManager = {
	get score() {
		return triviaObject.score;
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
		const currentQuestion = triviaObject.questions[triviaObject.currentQuestionIndex];
		if (!currentQuestion) return;
		const allAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
		triviaObject.shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
	},

	selectAnswer(answer: string) {
		if (!triviaObject.canSelectAnswer) return;

		const currentQuestion = triviaObject.questions[triviaObject.currentQuestionIndex];
		const isCorrect = answer === currentQuestion.correct_answer;

		if (isCorrect) {
			triviaObject.correctAnswers++;
			this.updateScore(10);
		} else {
			triviaObject.incorrectAnswers++;
		}

		triviaObject.selectedAnswer = answer;
		triviaObject.isAnswerCorrect = isCorrect;
		triviaObject.canSelectAnswer = false;

		setTimeout(() => {
			// Viive ennen siirtymistä seuraavaan kysymykseen
			if (triviaObject.currentQuestionIndex < triviaObject.questions.length - 1) {
				triviaObject.currentQuestionIndex++;
				this.shuffleAnswers();
			} else {
				// removed console.log
			}
			// Nollaa tilan seuraavaa kysymystä varten
			triviaObject.selectedAnswer = null;
			triviaObject.isAnswerCorrect = null;
			triviaObject.canSelectAnswer = true;
		}, 1000);
	},

	updateScore(points: number) {
		triviaObject.score += points;
		if (triviaObject.score > triviaObject.highScore) {
			triviaObject.highScore = triviaObject.score;
		}
	},

	async selectCategory(categoryId: number): Promise<boolean> {
		console.log(`Valittu kategoria: ${categoryId}`);
		try {
			triviaObject.currentQuestionIndex = 0;
			triviaObject.selectedCategoryId = categoryId;
			const response = await fetch(
				`https://opentdb.com/api.php?amount=20&category=${categoryId}&difficulty=medium&type=multiple`
			);
			const data = await response.json();
			triviaObject.questions = data.results;
			if (data.results.length > 0) {
				this.shuffleAnswers();
			}
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

	reset() {
		triviaObject.selectedCategoryId = null;
		triviaObject.questions = [];
		triviaObject.currentQuestionIndex = 0;
		triviaObject.shuffledAnswers = [];
		triviaObject.selectedAnswer = null;
		triviaObject.isAnswerCorrect = null;
		triviaObject.canSelectAnswer = true;
		triviaObject.score = 0;
		triviaObject.correctAnswers = 0;
		triviaObject.incorrectAnswers = 0;
	}
};