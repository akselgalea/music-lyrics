<script>
// @ts-nocheck

  import MusicCard from '$lib/components/MusicCard.svelte';
  export let data = {};

  const { albums, artists, playlists, tracks } = data;
</script>

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
    <MusicCard track={track} />
  {/each}
</div>