<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
		header?: Snippet;
		content?: Snippet;
		footer?: Snippet;
	}

	let { isOpen, onClose, header, content, footer }: Props = $props();

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}
</script>

{#if isOpen}
	<div
		class="backdrop"
		onclick={onClose}
		onkeydown={handleKeydown}
		role="button"
		tabindex="0"
		aria-label="Close modal"
	></div>

	<div
		class="modal"
		transition:fly={{ y: -300, delay: 50, duration: 400 }}
		role="dialog"
		aria-modal="true"
	>
		<header>
			{#if header}
				{@render header()}
			{:else}
				<h2>About MindSpark</h2>
			{/if}
		</header>

		<div class="modal-content">
			{#if content}
				{@render content()}
			{:else}
				<p>Welcome to MindSpark - the trivia game that challenges your knowledge!</p>

				<h3>How to Play:</h3>
				<ul>
					<li>Choose from 4 different categories</li>
					<li>Answer 20 questions as quickly as possible</li>
					<li>Earn more points by answering correctly and quickly</li>
					<li>Try to beat your high score in each category</li>
				</ul>

				<h3>Developed by:</h3>
				<ul>
					<li>Essi Kaukometsä - UI/UX</li>
					<li>Jani Saari - UI/UX</li>
					<li>Jesse Kokki - Frontend & SFX</li>
					<li>Jarius Korpisaari - Frontend</li>
				</ul>

				<p class="credits">Developed by the MindSpark Team</p>
				<p class="credits">Music by Ikoliks</p>
			{/if}
		</div>

		<footer>
			{#if footer}
				{@render footer()}
			{:else}
				<button class="modal-close-button" onclick={onClose}>Close</button>
			{/if}
		</footer>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.75);
		z-index: 10;
	}

	.modal {
		padding: 1.2rem;
		position: fixed;
		top: 8vh;
		left: 50%;
		transform: translateX(-50%);
		width: 480px;
		max-width: 90%;
		max-height: 75vh;
		background: #f8f5fc;
		border-radius: 5px;
		z-index: 100;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
		overflow-y: auto;
		color: var(--buttontext-color);
	}

	.modal header {
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--button2-color);
	}

	.modal h2 {
		margin: 0;
		font-family: 'Protest Strike', sans-serif;
		font-size: 2rem;
		color: var(--buttontext-color);
		text-align: center;
	}

	.modal-content {
		padding: 1rem 0;
	}

	.modal-content p,
	.modal-content li {
		font-family: 'KoHo', sans-serif;
		line-height: 1.5;
		color: #411c5e;
		font-weight: 500;
	}

	.modal-content h3 {
		font-family: 'KoHo', sans-serif;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	.modal-content ul {
		margin-bottom: 1.5rem;
		margin-left: 0;
		padding-left: 0;
		list-style-type: none;
	}

	.credits {
		font-style: italic;
		margin-top: 0.5rem;
		text-align: center;
		font-weight: bold;
	}

	.modal footer {
		border-top: 1px solid var(--button2-color);
		padding-top: 0.75rem;
		padding-bottom: 0.25rem;
		display: flex;
		justify-content: flex-end;
	}

	.modal-close-button {
		background-color: var(--button1-color);
		border: none;
		padding: 0.4rem 1.2rem;
		border-radius: 20px;
		color: var(--buttontext-color);
		font-family: 'Protest Strike', sans-serif;
		font-size: 1.2rem;
		cursor: pointer;
		box-shadow:
			2px 2px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}

	.modal-close-button:hover {
		background-color: rgba(253, 170, 83, 40%);
		box-shadow:
			1px 1px 4px rgba(0, 0, 0, 25%),
			inset -3px -3px 4px rgba(0, 0, 0, 25%);
	}

	@media only screen and (max-width: 600px) {
		.modal {
			width: 90%;
			max-height: 70vh; /* Reduce max height on small devices */
			padding: 1rem;
			top: 5vh; /* Position higher on the screen */
		}

		.modal-content {
			padding: 0.75rem 0;
			max-height: 50vh; /* Limit content height */
			overflow-y: auto; /* Make only content scrollable */
		}

		.credits {
			margin-top: 0.25rem;
			margin-bottom: 0.25rem;
		}

		.modal footer {
			padding-top: 0.5rem;
			position: sticky; /* Make footer sticky */
			bottom: 0;
			background: #f8f5fc;
		}
	}

	@media only screen and (max-height: 600px) {
		.modal {
			top: 1vh;
			max-height: 85vh;
			padding: 0.75rem 0.75rem 0.5rem 0.75rem;
		}

		.modal h2 {
			font-size: 1.3rem;
			margin-bottom: 0;
		}

		.modal header {
			padding-bottom: 0.5rem;
		}

		.modal-content {
			padding: 0.5rem 0;
			max-height: 60vh; /* Constrain height */
			overflow-y: auto; /* Make content scrollable */
		}

		.modal-content h3 {
			font-size: 1.1rem;
			margin-top: 0.5rem;
			margin-bottom: 0.25rem;
		}

		.modal-content p,
		.modal-content li {
			font-size: 0.9rem;
			line-height: 1.2;
			margin: 0.2rem 0;
		}

		.modal-content ul {
			margin-bottom: 0.5rem;
		}

		.modal footer {
			padding-top: 0.5rem;
			position: sticky;
			bottom: 0;
			background: #f8f5fc;
			margin-top: 0.25rem;
		}

		.modal-close-button {
			padding: 0.25rem 0.75rem;
			font-size: 0.9rem;
		}
	}

	/* Specific styles for very small screens like iPhone 13 */
	@media only screen and (max-height: 480px) {
		.modal {
			top: 0;
			max-height: 95vh;
			padding: 0.5rem;
		}

		.modal header {
			padding-bottom: 0.4rem;
		}

		.modal h2 {
			font-size: 1.2rem;
		}

		.modal-content {
			padding: 0.4rem 0;
		}

		.modal footer {
			border-top-width: 1px;
			padding-top: 0.4rem;
		}

		.modal-close-button {
			padding: 0.2rem 0.6rem;
			font-size: 0.85rem;
		}
	}
</style>
