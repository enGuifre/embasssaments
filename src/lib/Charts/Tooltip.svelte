<script>
    export let evt = {};
    export let offset = -35;
  
</script>

  {#if evt.detail}
  
    <div
      class="tooltip"
      style="
        top:{evt.detail.e.layerY + offset}px;
        left:{evt.detail.e.layerX}px;
      "
    >
      <slot detail={evt.detail} />
    </div>
  {/if}
  
  <style>
    .tooltip {
      position: absolute;
      width: 150px;
      color:black;
      border: 1px solid #5d1ac8;
      font-size: 13px;
      background: rgba(255, 255, 255, 0.85);
      transform: translate(-50%, -100%);
      padding: 5px;
      z-index: 15;
    }
  </style>
  