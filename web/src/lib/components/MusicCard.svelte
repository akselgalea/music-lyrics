<script>
	import { onMount } from "svelte";
  
  export let track;
  /**
	 * @type {HTMLAudioElement}
	 */
  let music;
  let titleContainerWidth;

  onMount(() => {
    music = new Audio(track.preview);
    music.volume = 0.1;
  })

  function playTrack () {
    music.play()
  }

  function pauseTrack () {
    music.pause()
  }
</script>

<div class="w-full slideText bg-white">
  <img 
    class="w-full object-cover h-[200px]"
    src={track.album.cover}
    alt="{track.title} album cover"
    on:mouseenter={ playTrack }
    on:mouseleave={ pauseTrack } 
  />

  <div bind:clientWidth={titleContainerWidth} class="w-full overflow-hidden px-2 py-2">
    <div 
      class={
        `text-center font-semibold text-md ${(track.title.length * 10)  > titleContainerWidth ? 'title' : ''}`
      }
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

  @keyframes moveText {
    from {
      transform: translateX(90%);
    }
    to {
      transform: translateX(-100%);
    }
  }
</style>