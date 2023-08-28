<script>
	// @ts-nocheck
	import MusicCard from '$lib/components/MusicCard.svelte';
	export let data = {};

	const { albums, artists, playlists, tracks } = data;
	let lastPlayed = null;

	function handlePlay(event) {
		const id = event.detail.audio;

		if (!lastPlayed) lastPlayed = id;

		if (lastPlayed == id) return;

		document.getElementById(lastPlayed).pause();
		lastPlayed = id;
	}
</script>

<svelte:head>
	<title>Index</title>
</svelte:head>

{#each albums.data as album}
	<div>
		Album: {album.title}
	</div>
{/each}

{#each artists.data as artist}
	<div>
		Artist: {artist.name}
	</div>
{/each}

{#each playlists.data as playlist}
	<div>
		Playlist: {playlist.title}
	</div>
{/each}

<div class="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 my-7">
	{#each tracks.data as track (track.id)}
		<MusicCard {track} on:play={handlePlay} />
	{/each}
</div>
