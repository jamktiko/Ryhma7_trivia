<script lang="ts">
	// Define types for our trivia data
	interface Category {
		id: number;
		name: string;
	}

	interface Question {
		category: string;
		type: string;
		difficulty: string;
		question: string;
		correct_answer: string;
		incorrect_answers: string[];
	}

	// Create reactive state for our trivia manager
	const triviaState = $state({
		categories: [
			{ id: 21, name: 'Sports' },
			{ id: 23, name: 'History' },
			{ id: 25, name: 'Art' },
			{ id: 27, name: 'Animals' }
		],
		selectedCategoryId: null as number | null,
		questions: [] as Question[]
	});

	// Export the triviaManager object with methods and accessors
	export const triviaManager = {
		get categories() {
			return triviaState.categories;
		},

		get selectedCategoryId() {
			return triviaState.selectedCategoryId;
		},

		get questions() {
			return triviaState.questions;
		},

		get selectedCategory() {
			return triviaState.categories.find((cat) => cat.id === triviaState.selectedCategoryId);
		},

		// Method to fetch questions for a selected category
		async fetchCategory(categoryId: number): Promise<Question[]> {
			try {
				// Store the selected category ID
				triviaState.selectedCategoryId = categoryId;

				// Fetch questions from the API
				const response = await fetch(
					`https://opentdb.com/api.php?amount=20&category=${categoryId}&difficulty=medium&type=multiple`
				);
				const data = await response.json();

				// Store the questions
				triviaState.questions = data.results;

				return data.results;
			} catch (error) {
				console.error('Error fetching category questions:', error);
				triviaState.questions = [];
				return [];
			}
		},

		// Method to reset the selection
		reset() {
			triviaState.selectedCategoryId = null;
			triviaState.questions = [];
		}
	};
</script>
