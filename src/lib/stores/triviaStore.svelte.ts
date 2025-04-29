// Tyypitys
// interface Category {
// 	id: number;
// 	name: string;
// }

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
		{ id: 25, name: 'Art' },
		{ id: 27, name: 'Animals' }
	],
	selectedCategoryId: null as number | null,
	questions: [] as Question[]
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

	// Fetchaa datan API:sta ja asettaa sen triviaObjectiin
	// consolelogit placeholdereita.
	async fetchCategory(categoryId: number): Promise<Question[]> {
		try {
			triviaObject.selectedCategoryId = categoryId;
			const response = await fetch(
				`https://opentdb.com/api.php?amount=20&category=${categoryId}&difficulty=medium&type=multiple`
			);
			const data = await response.json();
			triviaObject.questions = data.results;
			return data.results;
		} catch (error) {
			console.error('Error fetching category questions:', error);
			triviaObject.questions = [];
			return [];
		}
	},
	// Resettaa CategoryId:n ja kysymykset taulukon.
	reset() {
		triviaObject.selectedCategoryId = null;
		triviaObject.questions = [];
	}
};
