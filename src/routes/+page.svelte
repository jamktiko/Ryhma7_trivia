<script lang="ts">
	import Button from '$lib/components/Button.svelte';
</script>

<!-- HTML tähän -->
<html lang="en">
	<head>
		<title>MindSpark Trivia</title>
	</head>

	<body>
		<div>
			<h1>Welcome to MindSpark!</h1>
			<h2>Are you ready to test your knowledge?</h2>
			<h3>Choose a category</h3>
			<!-- <Button text="testi nappi" onclick={() => {}} /> -->
		</div>
	</body>
</html>

<style>
	body {
		font-size: 100%;
		margin: 5 auto;
		text-align: center;
		background-color: #e1d5e7;
		color: #411c5e;
	}
	h1 {
		font-size: 55px;
	}
	h2 {
		font-size: 48px;
	}
	h3 {
		font-size: 40px;
	}
</style>
