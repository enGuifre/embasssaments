<script>
    export let month_historical_data;
</script>

  <ul class='month_history'>
            {#each month_historical_data as month_historical_datum}
            
              <li>{month_historical_datum.dia} <div>{month_historical_datum.volume+' hmsss3'}</div>
                <div>{month_historical_datum.perc_volume+' %'}</div>
              </li>
            {/each} 
          </ul>