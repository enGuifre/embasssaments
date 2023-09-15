<script>
	// https://svelte.dev/docs#tweened
	import { tweened } from 'svelte/motion';
	// https://svelte.dev/docs#svelte_easing
	import { backInOut } from 'svelte/easing';
	
	export let perc_volume;
	/* export let dia;
	export let delTime; */
	
	let color='#5959dc';
	const progress = tweened(100, {
		//delay: delTime,
		duration: 1000,
		/* easing: backInOut */
	});
	
	// Changes the initial value of 30 to percent value in skillLevels array
	progress.set(perc_volume)
	
</script>

<div class="container">
	
  <div class="bar" 
			 style="width: {$progress}%; background-color: {color}">
		<span>{perc_volume}%</span>
	</div>
</div>


<style>	
	.container {
		width: 100%;
		background-color: #0096ff5c;
		margin-bottom: 5px;
		position: relative;
		border: 0.2px solid #7d7676;
        /* height: 15px; */
	}
	span 
	{
		padding-left:2px;
	}
	
	/* span {
        height: 15px;
		position: absolute;
		top: 26%;
		left: 15px;
		font-weight: 500;
		color: white;
	} */
	
	.bar {
        text-align: right;
		padding: 5px 3px 3px 0;
		font-weight: 400;
		color: white;
		background-color: rgb(65 65 186);
    border: 0.2px solid #c6b9b9;

		/* transition: .5s ease-out; */
		font-size:10px;
		/*  */
	}
</style>