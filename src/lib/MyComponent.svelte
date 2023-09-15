<script>
    import PopupBar from './PopupBar.svelte';
	import LineChart from './Charts/LineChart.svelte';
    
    export let data;
	/* export let points_data; */
    export let prevYearData;
    console.log(data)
    
    
    let delTime=20;
    let delay=0;
    
    </script>
     {#if data && data.length>0}
        
     <div>
      {#each data as {perc_volume, dia,vol_hm3}}
      <div style='color:gold'>{dia}</div>
      <PopupBar {perc_volume} 
                          
                          
                      
                          />
                          <div>{vol_hm3} hm3</div>
      {/each}
</div>   
        
    {/if}	 

    
	<!-- {#if points_data}
		<LineChart data={points_data}/>
	{/if} -->
    {#if prevYearData}
    <button on:click={() => {
        
         const event = new CustomEvent('updateCompare', {
        detail: {
          map_compare: true,
          currentInfo:data,
          prevYearInfo:prevYearData?prevYearData:'2022'
        }
      });
      dispatchEvent(event);
    }
        
      }>Comparar imatges satèl·lit</button>
    
    {/if}
    
    
    
    