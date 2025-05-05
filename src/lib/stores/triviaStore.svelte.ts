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

const triviaState = $state({
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

//Kaikki consolelogit testaamista varten

// Getterit kategoriaa, valittua kategoriaa ja kysymyksiä varten
export const triviaManager = {
	get score() {
		return triviaState.score; // Palauttaa pistemäärän
	},
	get correctAnswers() {
		return triviaState.correctAnswers; // Palauttaa oikeiden vastausten määrän
	},
	get incorrectAnswers() {
		return triviaState.incorrectAnswers; // Palauttaa väärien vastausten määrän
	},
	get categories() {
		return triviaState.categories; // Palauttaa kaikki kategoriat
	},
	get selectedCategoryId() {
		return triviaState.selectedCategoryId; // Palauttaa valitun kategorian ID:n
	},
	get selectedCategory() {
		return triviaState.categories.find(
			(category) => category.id === triviaState.selectedCategoryId // Palauttaa kategoria objektin find metodilla, joka vastaa valittua kategoriaa
			// Jos ei löydy, palauttaa undefined
		);
	},
	get questions() {
		return triviaState.questions; // Palauttaa kaikki kysymykset
	},
	get currentQuestionIndex() {
		return triviaState.currentQuestionIndex; // Palauttaa nykyisen kysymyksen indeksin
	},
	get shuffledAnswers() {
		return triviaState.shuffledAnswers; // Palauttaa sekoitetut vastaukset
	},
	get selectedAnswer() {
		return triviaState.selectedAnswer; // Palauttaa valitun vastauksen
	},
	get isAnswerCorrect() {
		return triviaState.isAnswerCorrect; // Palauttaa vastauksen oikeellisuuden
	},
	get canSelectAnswer() {
		return triviaState.canSelectAnswer; // Palauttaa voiko valita vastauksen
	},
	get currentQuestion() {
		return triviaState.questions[triviaState.currentQuestionIndex]; // Palauttaa nykyisen kysymyksen
	},
	get isCategorySelected() {
		return triviaState.categorySelected; // Palauttaa onko kategoria valittu
	},

	// Sekoittaa vastaukset nykyiselle kysymykselle, jotta oikea vastaus ei ole aina ensimmäisenä
	shuffleAnswers() {
		const currentQuestion = triviaState.questions[triviaState.currentQuestionIndex];
		if (!currentQuestion) return;
		//Consolelogaa kategorian ja kysymyksen
		console.log(`Category: ${currentQuestion.category}`);
		console.log(
			`Question ${triviaState.currentQuestionIndex + 1}/${triviaState.questions.length}`
		);
		console.log(`Question: ${currentQuestion.question}`);
		const allAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
		triviaState.shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
		console.log('Sekoitettu vastaukset:', triviaState.shuffledAnswers);
	},

 
    // Käsittelee vastauksen valinnan
    selectAnswer(answer: string) {
        // Estää uuden vastauksen valinnan odotuksen aikana
		if (!triviaState.canSelectAnswer) return;
		const currentQuestion = triviaState.questions[triviaState.currentQuestionIndex];
        const isCorrect = answer === currentQuestion.correct_answer;
        // Asettaa valitun vastauksen ja sen oikeellisuuden
		triviaState.selectedAnswer = answer;
		triviaState.isAnswerCorrect = isCorrect;
		triviaState.canSelectAnswer = false;

		setTimeout(() => {
			// Viive ennen siirtymistä seuraavaan kysymykseen
			if (triviaState.currentQuestionIndex < triviaState.questions.length - 1) {
				triviaState.currentQuestionIndex++;
				this.shuffleAnswers();
			} else {
				console.log('completed!');
			}
			// Nollaa tilan seuraavaa kysymystä varten
			triviaState.selectedAnswer = null;
			triviaState.isAnswerCorrect = null;
			triviaState.canSelectAnswer = true;
		});
	},

	updateScore(points: number) {
		// Add the points to the score
		triviaState.score += points;

		// Update high score if needed
		if (triviaState.score > triviaState.highScore) {
			triviaState.highScore = triviaState.score;
		}
	
			// Viive ennen siirtymistä seuraavaan kysymykseen
			if (triviaState.currentQuestionIndex < triviaState.questions.length - 1) {
				triviaState.currentQuestionIndex++;
				this.shuffleAnswers();
			} else {
				console.log('completed!');
			}
			// Nollaa tilan seuraavaa kysymystä varten
			triviaState.selectedAnswer = null;
			triviaState.isAnswerCorrect = null;
			triviaState.canSelectAnswer = true;
	}
	
	// Fetchaa datan API:sta ja asettaa sen triviaObjectiin
	// Tämä funktio "optimoitu" AI:n avulla. Käytännössä yhdistetty 2 aikasempaa funktiota.
	,
	async selectCategory(categoryId: number): Promise<boolean> {
        console.log(`Valittu kategoria: ${categoryId}`);
        try {
            // Nollaa kysymyksen indeksin uuden kategorian hakemisen yhteydessä
			triviaState.currentQuestionIndex = 0;
			triviaState.selectedCategoryId = categoryId;
            const response = await fetch(
                `https://opentdb.com/api.php?amount=20&category=${categoryId}&difficulty=medium&type=multiple`
            );
            const data = await response.json();
			triviaState.questions = data.results;
            // Sekoittaa vastaukset ensimmäiselle kysymykselle
			if (data.results.length > 0) {
				this.shuffleAnswers();
			}
            // Asettaa kategorian valituksi
			triviaState.categorySelected = true;
            console.log(`Haettu ${data.results.length} kysymystä kategorialle ${categoryId}`);
			return true;
		} catch (error) {
			console.error('Haku ei onnistunut', error);
			triviaState.questions = [];
			triviaState.categorySelected = false;
			return false;
		}
	},

    reset() {
		triviaState.selectedCategoryId = null;
		triviaState.questions = [];
		triviaState.currentQuestionIndex = 0;
		triviaState.shuffledAnswers = [];
		triviaState.selectedAnswer = null;
		triviaState.isAnswerCorrect = null;
		triviaState.canSelectAnswer = true;
	}}