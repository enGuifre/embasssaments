<!--
  @component
  Generates an SVG area shape using the `area` function from [d3-shape](https://github.com/d3/d3-shape).
 -->
 <script>
    import { getContext,createEventDispatcher } from 'svelte';
    let hideTooltip = false;

    const dispatch = createEventDispatcher();
		
		function handleMousemove(feature) {
      console.log(feature)
			return function handleMousemoveFn(e) {

				raise(this);
				// When the element gets raised, it flashes 0,0 for a second so skip that
				if (e.layerX !== 0 && e.layerY !== 0) {
					dispatch("mousemove", { e });
				}
			};
		}

    const { data, xGet, yGet } = getContext('LayerCake');
  console.warn(data)
    /** @type {String} [stroke='#ab00d6'] - The shape's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color. */
    export let stroke = '#6068d6';
  
    $: path = 'M' + $data
      .map(d => {
        return $xGet(d) + ',' + $yGet(d);
      })
      .join('L');
  </script>
      {#each [data] as d, i}
    <g
    class="line-group"
    on:mouseout={(e) => dispatch("mouseout")}
    on:blur={(e) => dispatch("mouseout")}
    > 
  <path class='path-line' d='{path}' {stroke}
  
  on:mouseover={(e) => dispatch("mousemove", { e, props: d })}
  on:focus={(e) => dispatch("mousemove", { e, props: d })}
  on:mousemove={(e) => handleMousemove(e, d)}
  ></path>
  </g> 
  {/each}
  <style>
    .path-line {
      fill: none;
      stroke-linejoin: round;
      stroke-linecap: round;
      stroke-width: 2;
    }
  </style>