<script>
	import { createEventDispatcher } from 'svelte';
	import { format } from '$lib/helpers/audio-controls.js';
	export let track;

	const dispatch = createEventDispatcher();

	let titleContainerWidth;
	let time = 0;
	let duration;
	let paused = true;
	let volume = 0.1;
	let searchTime = 0;

	function togglePause() {
		paused = !paused;

		if (!paused)
			dispatch('play', {
				audio: `track-${track.id}`
			});
	}

	function timeChange(e) {
		const div = e.currentTarget;

		function seek(e) {
			const { left, width } = div.getBoundingClientRect();

			let p = (e.clientX - left) / width;
			if (p < 0) p = 0;
			if (p > 1) p = 1;

			time = p * duration;
		}

		seek(e);

		window.addEventListener('pointermove', seek);

		window.addEventListener(
			'pointerup',
			() => {
				window.removeEventListener('pointermove', seek);
			},
			{
				once: true
			}
		);
	}

	function timeSearch(e) {
		const div = e.currentTarget;

		function seek(e) {
			const { left, width } = div.getBoundingClientRect();

			let p = (e.clientX - left) / width;
			if (p < 0) p = 0;
			if (p > 1) p = 1;

			searchTime = p * duration;
		}

		seek(e);

		window.addEventListener('pointermove', seek);

		window.addEventListener(
			'pointerup',
			() => {
				window.removeEventListener('pointermove', seek);
			},
			{
				once: true
			}
		);
	}
</script>

<div class="w-full slideText bg-white {paused ? 'paused' : 'playing'}">
	<div class="select-none relative player">
		<audio
			src={track.preview}
			bind:currentTime={time}
			bind:duration
			bind:paused
			bind:volume
			on:ended={() => (time = 0)}
			id="track-{track.id}"
		/>

		<img
			src={track.album.cover}
			class="object-cover w-full h-[180px] absolute top-0 left-0"
			alt={track.title}
		/>

		<div class="controls">
			<button class="play-btn" on:click={togglePause} aria-label={paused ? 'play' : 'pause'} />

			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<div class="track" on:pointerdown={timeChange} on:mouseover={timeSearch} role="progressbar">
				<div class="timer font-semibold text-xs" style="--search: {searchTime / duration}%">
					{format(searchTime)}
				</div>
				<div class="progress" style="--progress: {time / duration}%" />
				<div class="point" />
			</div>
		</div>
	</div>

	<div bind:clientWidth={titleContainerWidth} class="w-full overflow-hidden px-2 py-2">
		<div
			class={`text-center font-semibold text-md ${
				track.title.length * 10 > titleContainerWidth ? 'title' : ''
			}`}
		>
			{track.title}
		</div>

		<div class="mt-2">
			<p class="text-sm font-semibold">{track.artist.name}</p>
			<p class="text-sm text-gray-500">{track.album.title}</p>
		</div>
	</div>
</div>

<style>
	.title {
		position: relative;
		white-space: nowrap;
	}

	.slideText:hover .title {
		animation: moveText 7s linear infinite;
	}

	.player {
		width: 100%;
		height: 180px;
	}

	.playing .controls {
		display: grid;
	}

	.controls {
		display: none;
		width: 100%;
		height: 100%;
		place-items: center;
		background-color: black;
		opacity: 0.8;
		overflow: hidden;
	}

	.controls .play-btn {
		width: 3rem;
		height: 3rem;
		background-position: 50% 50%;
		background-repeat: no-repeat;
		background-color: #585858;
		opacity: 1;
		border-radius: 50%;
	}

	.track {
		display: flex;
		position: absolute;
		cursor: pointer;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 6px;
		background-color: white;
	}

	.timer {
		display: none;
		position: absolute;
		bottom: 1rem;
		left: calc(100 * var(--search));
		height: 1rem;
		padding: 2px;
		color: white;
		text-align: center;
		transform: translateX(-1em);
	}

	.progress {
		width: calc(100 * var(--progress));
		height: 100%;
		background-color: gray;
	}

	.point {
		display: none;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: gray;
		transform: translate(-5px, -2.5px);
	}

	.track:hover .point {
		display: block;
	}

	.track:hover .timer {
		display: flex;
	}

	.player:hover .controls {
		display: grid;
	}

	[aria-label='pause'] {
		background-image: url($lib/assets/pause.svg);
	}

	[aria-label='play'] {
		background-image: url($lib/assets/play.svg);
	}

	@keyframes moveText {
		from {
			transform: translateX(90%);
		}
		to {
			transform: translateX(-110%);
		}
	}
</style>
