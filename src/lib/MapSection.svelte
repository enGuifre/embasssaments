<script>
  import Map from "./Map.svelte";
  import Map_compare from "./Map_compare.svelte";

  //import map_compare from "./Map.svelte";
  import * as d3 from "d3";
  export let api_data;
  export let map_compare;
  
alert('map_compare is'+map_compare)
</script>



{#if map_compare && map_compare===true}
<Map_compare/> 
  {:else}
      {#if api_data}
      <Map {api_data}/> 
      {/if}
  
{/if}


 
<!---->

<style>
  
  :global(.maplibregl-control-container) {
    z-index: 99999999;
  }

  :global(.maplibregl-control-container, .maplibregl-ctrl-top-right) {
    z-index: 99999;
    position: fixed;
  }
  :global(.scale_container path.domain),
  :global(.scale_container line) {
    opacity: 0;
  }

 
  
  :global(.maplibregl-popup-content) {
    color: white !important;
    background: black;
    z-index: 111111111 !important;
  }
  :global(.maplibregl-ctrl-bottom-right) {
    z-index: 99999;
    background: #242424;
  }
</style>
