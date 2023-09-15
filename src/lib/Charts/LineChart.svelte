<script>
    import { LayerCake, Svg,Html } from 'layercake';
  
    import Line from './Line.svelte';
    import Area from './Area.svelte';
    import AxisX from './AxisX.svelte';
    import AxisY from './AxisY.svelte';
  	import Tooltip from './Tooltip.svelte';
    export let data;
    let plot_data=data.data.map((d)=>{
      return {dia:d.dia.split('/')[2],perc_volume:d.perc_volume}
    })
    console.log(plot_data)

    let evt;
    let hideTooltip = true;

    
    

    // This example loads csv data as json using @rollup/plugin-dsv
    //import data from './_data/points.csv';
   
  
    const xKey = 'dia';
    const yKey = 'perc_volume';
  
  /*   data.forEach(d => {
      d[yKey] = +d[yKey];
    }); */
  </script>
  
  <style>
    /*
      The wrapper div needs to have an explicit width and height in CSS.
      It can also be a flexbox child or CSS grid element.
      The point being it needs dimensions since the <LayerCake> element will
      expand to fill it.
    */
    .chart-container {
      width: 100%;
      height: 180px;
    }
  </style>
  
  <div class="chart-container">
    <LayerCake
    
      padding={{ top: 8, right: 10, bottom: 20, left: 25 }}
      x={xKey}
      y={yKey}
      yNice={4}
      yDomain={[0, null]}
      data={plot_data}
    >
      <Svg>
        <AxisX
        gridlines={true}
        textAnchor="start"
        
        tickMarks={true}
        />
        <AxisY
        gridlines={false}
        
        snapTicks={true}
        tickMarks={false}
          
        />
     
        <Line  on:mousemove={event => evt = hideTooltip = event}
          on:mouseout={() => (hideTooltip = true)}/>
        <Area/>
      </Svg>

      <!-- <Html
      pointerEvents={false}
    >
      {#if hideTooltip !== true}
      <Tooltip
        {evt}
        let:detail
      >
      {@const tooltipData = { ...detail.props }}
            <div class="row">{tooltipData.dia}: {tooltipData.perc_volume}</div>
      </Tooltip>
  {/if}
</Html> -->
    </LayerCake>
  </div>