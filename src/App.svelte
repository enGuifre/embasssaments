<script>
  
  /* import MapSection from "./lib/MapSection.svelte"; */
  /* import { api } from '../services/api.js'; */
  import Map from "./lib/Map.svelte";
  import Map_compare from "./lib/Map_compare.svelte";

//  import api_data from "./data/fsensors.json";
  import reservoirs_CHE from "./data/reservoirs_CHE.json";
  import historical from "./data/reservoirs_not_aca_data.json";
    
  import { onMount } from 'svelte';
  import csvtojson from 'csvtojson';
  import {csv} from 'd3-fetch'
  import {groups} from 'd3-array'
  let w;
  
  let api_data;
  let api_data_CHE;
  
  let loading = true;

  //Get data from one year ago for not_aca reservoirs
  //console.log(historical);
  let now = new Date();
  let day = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();
  day = parseInt(day,10);
  month = parseInt(month,10);
  year--;
  const oneYearAgo = day+"/"+month+"/"+year;
  //console.log(oneYearAgo);
  let filteredHist = historical.filter(dh => dh.Dia === oneYearAgo);

async function fetchSpreadsheetData() {
  try {
    const base = "https://docs.google.com";
    const id = '1J1SwO8h0BSRZ1iv-QS1L00nU4fb9Wv2eKNdIT0aBfJo';
    const gid = '0'
    const file = `spreadsheets/u/1/d/${id}/export?format=csv&id=${id}&gid=${gid}`
    const url = `${base}/${file}`;
    let data = await csv(url); 
    let adaptedData = data.map(d => ({
            sensor: d.Sensor,
            value: d.Value,
            timestamp: d.Timestamp
          }))
          api_data = groups(adaptedData, d => d.sensor).map(d => ({
            sensor : d[0],
            observations : [{...d[1][d[1].length-1], location :''}]
          }))

    const id_CHE = '1QA_OBi0XtXeJ6BIr7MGV2olnW4JcmpFSmENjHfl9vuY';
    const file_CHE = `spreadsheets/u/1/d/${id_CHE}/export?format=csv&id=${id_CHE}&gid=${gid}`
    const url_CHE = `${base}/${file_CHE}`;
    let data_CHE = await csv(url_CHE); 
    api_data_CHE = reservoirs_CHE.map(d => {
      let abs_value = "-1";
        let perc_value = "-1";
        let date = "01/01/1970";
        let prev_abs_value = "-1";
        let prev_perc_value = "-1";
        let prev_date = oneYearAgo; //Computed on the top
        let filtered_data_CHE = data_CHE.filter(dc => dc.Sensor === d.nivell_absolut);
        //assuming from oldest to newest
        if(filtered_data_CHE){
          abs_value = filtered_data_CHE[filtered_data_CHE.length -1].Value.replace(/,/g, '.'); //replace comma by dot
          date = filtered_data_CHE[filtered_data_CHE.length -1].Time.substring(0, 10);
          //for now we take the first data item as a reference -> It should be one year before
          //prev_abs_value = filtered_data_CHE[0].Value.replace(/,/g, '.'); //replace comma by dot
          //prev_date = filtered_data_CHE[0].Time.substring(0, 10);
        }
        filtered_data_CHE = data_CHE.filter(dc => dc.Sensor === d.nivell_perc);
        //assuming from oldest to newest
        if(filtered_data_CHE){
          perc_value = filtered_data_CHE[filtered_data_CHE.length -1].Value.replace(/,/g, '.'); //replace comma by dot
          //prev_perc_value = filtered_data_CHE[0].Value.replace(/,/g, '.'); //replace comma by dot
        }
          //from the historical data
        let historicalItem = filteredHist.filter(dh => dh.Codi_ACA === d.Codi_ACA);
        //console.log(historicalItem)
        if(historicalItem){
          prev_abs_value = historicalItem[0].vol_hm3;
          prev_perc_value = historicalItem[0].perc_volume;
        }


        let dd =({
          ...d,
          dia: date,
          Dia: date,
          perc_volume: +perc_value,
          vol_hm3: +abs_value,
          prev_dia: prev_date,
          prev_perc_volume: +prev_perc_value,
          prev_vol_hm3: +prev_abs_value
        });
        return dd;
    });
    //console.log(api_data_CHE);
  } catch (error) {
    console.error('Error fetching spreadsheet data:', error);
  } finally {
    loading = false;
  }
}

onMount(fetchSpreadsheetData);

function findBasedOnNameAndDate(histArray, name, date){

  return "TO DO";
}

let map_compare;
let currentInfo;
let prevYearInfo;
 /*  setTimeout(function()
  {
    let map_compare=false;
  let map_api_data=true;
  },5000) */

  //the event triggered from mycomponent.svelte 'Satellite' button
   window.addEventListener('updateCompare', (event) => {

    map_compare = event.detail.map_compare;
    console.warn('updateCompare',event)
    if (event.detail.currentInfo)
    {
      
      prevYearInfo=event.detail.prevYearInfo;
      currentInfo=event.detail.currentInfo;
    }
    
  });

  //the close satellite button event
  window.addEventListener('closeSatelliteEvent', (event) => {    
    map_compare = event.detail.map_compare;
    console.warn('closeSatelliteEvent',map_compare)
});
  //console.warn(map_compare)

// setTimeout(function() {
//   map_compare=true;
// }, 5000);
</script>

  <section>
    {#if !map_compare || map_compare==false}
      {#if api_data}
        <Map {api_data} {api_data_CHE}/> 
      {:else}
        <div>Loading...</div>
      {/if}
    {:else}
      <Map_compare {map_compare} {currentInfo} {prevYearInfo}/>  
    {/if}
  </section>
  


<style>
  :global(.maplibregl-popup .prevDate)
  {
    
    color: gold;
    padding-top: 10px;
    margin-top: 10px;
    border-top: 1px solid gray;
    /* margin-bottom: 7px; */

  }
  :global(.maplibregl-popup .title)
{
  font-size: 1rem;
  text-align: center;
  margin-bottom: 5px;
}
  #app 
  {
    background-color: red;
    width: 100vw;
    margin:unset!important;
  
    display: flex;
    flex-direction: row;
    height: 100vh;
  }
  .highlighted 
  {
    font-size: 1.4rem;
    color: goldenrod;
  }
  .bar-chart {
    
    width: 100%;
  }
 /*  :global(.layercake-container line)
  {
    border-left: 1px dotted goldenrod;
  } */
  :global(.layercake-container .tooltip)
  {
    background-color: grey;
  }
  :global(.axis .tick-mark) {
    font-size: .725em;
    
    color:white;
    
    
    text-shadow:unset!important;
  }
  :global(.layercake-container .key-item .name,.layercake-container text) {
    font-size: .725em;
    
    color:white;
    fill:white;
    text-shadow:unset!important;
  }
  section {

    padding: 0px;
    margin: 0px;
    color: white;
  }
  :root 
  {
    color:white;
  }
  section,
  header {
    max-width: 700px;
    margin: 0 auto;
  }
  :global(.legendbox text) 
  {
    fill: white;
  }
  :global(body) 
  {
    
    background: black;
  }
  :global(.maplibregl-popup-content) 
  {
    border: 1.5px solid white;
    /* max-width: 100px; */
  }
  :global(.mapboxgl-popup-anchor-top .mapboxgl-popup-tip, .maplibregl-popup-anchor-top .maplibregl-popup-tip,
  .mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip, .maplibregl-popup-anchor-top-right .maplibregl-popup-tip
  ) {
    border-top-color: black!important;
    border-bottom-color: black!important;
  }

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
:global(.map-overlay-close svg)
{
  

  stroke:rgb(26, 16, 16)!important;
  stroke-width: .5;

}
 
  :global(.maplibregl-popup) {
    max-width: 40%!important;
    z-index: 111111111;
  }
  :global(.maplibregl-popup-content) {
    color: white !important;
    background: black;
    z-index: 111111111 !important;
    padding-left: 10px;
    padding-right: 10px;
  }
  :global(.maplibregl-ctrl-bottom-right) {
    z-index: 99999;
    background: #242424;
  }
  :global(.lineChart_container)
  {
    
    height: 180px;
  }
  :global(.close_popup):hover 
  {
    cursor: pointer;
  }
  :global(.maplibregl-compare)
  {
    top:80px!important;
  }
  :global(.close_popup)
  {

    color: white;
    width: 10px;
    position: absolute;
    top: 0px;
    /* float: right; */
    right: 10px;

  }
  :global(.maplibregl-ctrl-compass.mapboxgl-ctrl-compass)
{
  display:none;
}
  :global(.mapboxgl-popup-anchor-left .mapboxgl-popup-tip, .maplibregl-popup-anchor-left .maplibregl-popup-tip)
 {
  border-right-color: black!important;
 }
</style>
