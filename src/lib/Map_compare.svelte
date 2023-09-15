<script>
  import { onMount, onDestroy } from "svelte";
  import MdClear from 'svelte-icons/md/MdClear.svelte'  
  import { Map, NavigationControl, Popup, LngLat } from "maplibre-gl";
  //import * as Compare from "@maplibre/maplibre-gl-compare";
import Compare from "@maplibre/maplibre-gl-compare";
  import "maplibre-gl/dist/maplibre-gl.css";
  
  import jQuery from "jquery";
  
  import EventEmitter from 'events';
  import { mapStyle } from "../data/mapStyle";
  import { dams_bbox } from "../data/dams_bbox.js";
  import { detach_before_dev } from "svelte/internal";
  import { map } from "d3-array";

   let beforeMap;
   let icgc_sat_prev;
   let selectedSatelliteYear;
   let date = new Date();
export let map_compare;
export let currentInfo;
export let prevYearInfo;
let coords;
let afterMap;
let prevYearInfo_label_classes;
let currentYearInfo_label_classes;
let beforeMapLoading=true;
let afterMapLoading=true;
let loadingContainer;
if (currentInfo)
{
  console.info(currentInfo)
  console.info(dams_bbox.features)
  
   let bbox_pol=dams_bbox.features.filter(d=>String(d.properties.CODI_ACA)==String(currentInfo.CODI_ACA))[0];
   
   coords=bbox_pol.geometry.coordinates[0][0];
  
 
}
let day = date.getDate();
/*
The getMonth() method of Date instances returns the month for this date according to local time, 
as a zero-based value (where zero indicates the first month of the year).
*/
//January is 0+1
//August is 7+1
//october is 9+1
let month_number = date.getMonth()+1;

let month = (month_number)<10?`0${month_number}`:month_number;

//we substract 2 in order to be sure that we can get some info (previous month is not always available)
let prev_month = (month_number-3)<10?`0${month_number-3}`:month_number-3;


let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    let prevDate=`${day}/${prev_month}/${year-1}`;

   $:{
      if (selectedSatelliteYear) {
       
        //For the last year we should have all info, so we simply use month
              // Set the tile url to a cache-busting url (to circumvent browser caching behaviour):sen2irc_202304
          beforeMap.getSource('icgc_sat_source_prev').tiles = [ `https://geoserveis.icgc.cat/icgc_sentinel2/wms/service?REQUEST=GetMap&SERVICE=WMS&VERSION=1.3.0&LAYERS=sen2irc_${selectedSatelliteYear}${month}&STYLES=&FORMAT=image/jpeg&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&CRS=EPSG:3857&WIDTH=126&HEIGHT=126&BBOX={bbox-epsg-3857}`]
            
            

          // Remove the tiles for a particular source
          beforeMap.style.sourceCaches['icgc_sat_source_prev'].clearTiles()

          // Load the new tiles for the current viewport (map.transform -> viewport)
          beforeMap.style.sourceCaches['icgc_sat_source_prev'].update(beforeMap.transform)

          // Force a repaint, so that the map will be repainted without you having to touch the map
          beforeMap.triggerRepaint();
          console.log('selectedSatelliteYear')

       
                      
      }

   }

   let onMount_actions=function()
   {
    console.log(prevYearInfo)
    if (+prevYearInfo.perc_volume > 50) 
    prevYearInfo_label_classes='blue percent'
              else
      prevYearInfo_label_classes='red percent';

      if (+currentInfo.perc_volume > 50) 
      currentYearInfo_label_classes='blue percent'
              else
              currentYearInfo_label_classes='red percent'


   

              
    beforeMap = new Map({
        container: "before",
        style:
         mapStyle,
          center:[1.05, 41.4],
        zoom: 7,
      });

      afterMap = new Map({
        container: "after",
        style:
        mapStyle,
          center:[1.05, 41.4],
        zoom: 7
      });

      afterMap.on('moveend',function()
      {
        //make sure it starts counting only after the zoom has finished
     
        setTimeout(function () {
            if (beforeMapLoading || afterMapLoading)
            {
              
              loadingContainer.textContent='La càrrega dels mapes sembla que va lenta. Continua a l\'espera';
            }
            
          }, 8000);       
          
        setTimeout(function () {
            if (beforeMapLoading || afterMapLoading)
            {
              
              loadingContainer.textContent='La font de dades va molt lenta. Continua a l\'espera o torna-ho a intentar més tard';
            }
            
          }, 25000);   
      })
      beforeMap.on("load", function () {


 
     //let month = (date.getMonth())<10?`0${date.getMonth()}`:date.getMonth();
     //let day = date.getDate();
  
     console.info(`sen2irc_${year-1}${prev_month}`)

     //For the this year we may not still have ready last month data, this is why we substracted 2 to 'month'
      afterMap.addSource('icgc_sat_source_now', {
    
    'type': 'raster',
    'tiles': [
      `https://geoserveis.icgc.cat/icgc_sentinel2/wms/service?REQUEST=GetMap&SERVICE=WMS&VERSION=1.3.0&LAYERS=sen2irc_${year}${prev_month}&STYLES=&FORMAT=image/jpeg&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=512&HEIGHT=512`
    
     
    ],
    'tileSize': 512,
  
    });
    
      beforeMap.addSource('icgc_sat_source_prev', {
    
    'type': 'raster',
    'tiles': [
      `https://geoserveis.icgc.cat/icgc_sentinel2/wms/service?REQUEST=GetMap&SERVICE=WMS&VERSION=1.3.0&LAYERS=sen2irc_${year-1}${month}&STYLES=&FORMAT=image/jpeg&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=512&HEIGHT=512`
     
    ],
    'tileSize': 512,
  
    });


  

    afterMap.on('idle',function()
    {
      
      afterMapLoading=false;
    }) 

    beforeMap.on('idle',function()
    {
      
      beforeMapLoading=false;
    }) 
    icgc_sat_prev={

'id': 'icgc_sat_prev',

'type': 'raster',
'source': 'icgc_sat_source_prev',
'layout':
{
visibility: 'none'
},
'paint': {

}
}

    beforeMap.addLayer(icgc_sat_prev);

    
   
    afterMap.addLayer({

      'id': 'icgc_sat',
      
    'type': 'raster',
    'source': 'icgc_sat_source_now',
    'paint': {}
    });
    afterMap.fitBounds([
     coords[1], // southwestern corner of the bounds
     coords[0] // northeastern corner of the bounds
     ]);
      // A selector or reference to HTML element
      var container = "#comparison-container";

      var compare = new Compare(beforeMap, afterMap, container, {
       // mousemove: true, // Optional. Set to true to enable swiping during cursor movement.
        orientation: 'vertical' // Optional. Sets the orientation of swiper to horizontal or vertical, defaults to vertical
        // Set this to enable comparing two maps by mouse movement:
        // m ousemove: true
      });
      beforeMap.setLayoutProperty('icgc_sat_prev','visibility', 'visible');
      
  
    
    })
   }
  onMount(() => {
    console.warn('mount')

    if (map_compare && map_compare==true)
    onMount_actions()
    else 
    alert('do nothing')
   
  })
  let showComponent = true;

function destroyComponent() {
  showComponent = false;
}

  onDestroy(() => {
    beforeMap.remove();
    afterMap.remove();
    if (showComponent === false) {
      console.log('MyComponent has been destroyed');
    }
  });
</script>

<svelte:head>

  <link rel="stylesheet" href="https://rawcdn.githack.com/astridx/astridx.github.io/a9d7297a4fe1e3a4d7ebeb1e4e662fd1339ef3b5/maplibreexamples/plugins/maplibre-gl-compare.css" type="text/css" />


</svelte:head>
<!-- {#if showComponent} -->
<div class="map-wrap-compare">
  
  <div id="comparison-container">
    {#if map_compare}
    
    <div class="map-overlay-close" on:click={
    () => {
      
      
       const event = new CustomEvent('closeSatelliteEvent', {
            detail: {
              map_compare: false
            }
          });

          dispatchEvent(event);
          destroyComponent();

      }}>
      <MdClear />
    </div>
    <div class="map-overlay center">
      <div class="flexbox">
        <div class="prevYear box">
          <div class="info"><span class="date">{month}-2022</span><span 
            class="{prevYearInfo_label_classes}"> {prevYearInfo.perc_volume}%</span></div>
        </div>
        
        <div class="loading box" bind:this={loadingContainer} class:visible={(beforeMapLoading || afterMapLoading)}>
        
          <span>Carregant mapes...</span>
        
        </div>
          
        <div class="currentYear box">
          <!-- we have to define -2 months for current year bc often missing the satellite images -->
          <div class="info"><span class="date">{prev_month}-{year}</span><span class="{currentYearInfo_label_classes}"> {currentInfo.percent.toFixed(1)} %</span></div>
          
        </div>
      </div>
    <!--  -->
    </div>
   
    
    {/if}

    <div id="before" class="map"></div>
    <div  id="after" class="map"></div>
  </div>
  <!-- <div class="map" id="map" /> -->
</div>
<!-- {/if} -->

<style>
   body {
        overflow: hidden;
        color:black;
      }

      body * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .flexbox
{
    
     display: flex;
    padding: 6px 0;
    
    
    width: 100%;
}

.box {
    height: auto;
    width: auto;
    
    font-size: .8rem;
    display: flex;
    justify-content: center;
    align-items: center;
 color: white;
 font-weight: 500;
}
.box.currentYear,.box.prevYear
{
  width:auto;
  margin-right: 1rem;
  margin-left: 1rem;
}
.box.loading 
{
  width: 80%;
  background-color: tomato;
   opacity: 0%; 
}

.box.loading.visible
{
  opacity: 100%;
}
      .map {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
      }
      .info .date
      {
        color:whitesmoke
      }
      .info .percent
      {
        font-size: 1.2rem;
        
        
        font-weight: bolder;
      }
      .percent.blue
      {
        color: #00b4ff;
      }
      .percent.red
      {
        color: #c34242;
      }
      .info
      {
        width: max-content;
    background: #b1a6a6;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    background: #222121;
    border: 2px solid gray;
      }
      .info span 
      {
        display: block;
      }
 
      .map-overlay.center{
        text-transform: uppercase;
        color:black;
    position: absolute;
    top:8%;
    z-index: 9999999;
    /* background: black;
    border: 1px solid white; */
    

    padding: 10px;
    left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  width: 100%; /* Need a specific value to work */
  }
  
    .map-overlay-close:hover 
    {
      cursor: pointer;
    }
  .map-overlay-close {
    position: absolute;
    z-index: 11119999999;
    padding: 1px;
    width: 1.5rem;
    color: white;
    background-color: black;
    border: 2px solid gray;
    
    right: 1rem;
    top: .5rem;
}

.map-overlay .loadingss
{
  padding: 1.5rem;
    background: rgb(65 65 186);
    color: rgba(255, 255, 255, 0.85);
    font-weight: bold;
    position: absolute;
    justify-content: center;
    max-width: 30vw;
    left: 42%;
    border: 1px solid white;
}
.map-overlay .title
  {
    
    color:goldenrod;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .map-wrap {
    /* position: absolute!important; */
    
  }
  .maplibregl-compare .compare-swiper-vertical {
    background-color: #3887be;
    box-shadow: inset 0 0 0 2px #fff;
    display: inline-block;
    border-radius: 50%;
    position: absolute;
    width: 60px;
    height: 60px;
    top: 50%;
    left: -30px;
    margin: -30px 1px 0;
    color: #fff;
    cursor: ew-resize;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjYwIiAgIGhlaWdodD0iNjAiICAgdmVyc2lvbj0iMS4xIiAgIHZpZXdCb3g9IjAgMCA2MCA2MCIgICBpZD0ic3ZnNTQzNCIgICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkxK2RldmVsK29zeG1lbnUgcjEyOTExIiAgIHNvZGlwb2RpOmRvY25hbWU9Imwtci5zdmciPiAgPG1ldGFkYXRhICAgICBpZD0ibWV0YWRhdGE1NDQ0Ij4gICAgPHJkZjpSREY+ICAgICAgPGNjOldvcmsgICAgICAgICByZGY6YWJvdXQ9IiI+ICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4gICAgICAgIDxkYzp0eXBlICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+ICAgICAgPC9jYzpXb3JrPiAgICA8L3JkZjpSREY+ICA8L21ldGFkYXRhPiAgPGRlZnMgICAgIGlkPSJkZWZzNTQ0MiIgLz4gIDxzb2RpcG9kaTpuYW1lZHZpZXcgICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIgICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IiAgICAgYm9yZGVyb3BhY2l0eT0iMSIgICAgIG9iamVjdHRvbGVyYW5jZT0iMTAiICAgICBncmlkdG9sZXJhbmNlPSIxMCIgICAgIGd1aWRldG9sZXJhbmNlPSIxMCIgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIgICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTI4NiIgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc1MSIgICAgIGlkPSJuYW1lZHZpZXc1NDQwIiAgICAgc2hvd2dyaWQ9InRydWUiICAgICBpbmtzY2FwZTp6b29tPSI0IiAgICAgaW5rc2NhcGU6Y3g9IjI1Ljg4OTgzMSIgICAgIGlua3NjYXBlOmN5PSIzNC4zODE4MzMiICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMCIgICAgIGlua3NjYXBlOndpbmRvdy15PSIyMyIgICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjAiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmc1NDM0IiAgICAgaW5rc2NhcGU6b2JqZWN0LW5vZGVzPSJ0cnVlIiAgICAgaW5rc2NhcGU6c25hcC1zbW9vdGgtbm9kZXM9InRydWUiPiAgICA8aW5rc2NhcGU6Z3JpZCAgICAgICB0eXBlPSJ4eWdyaWQiICAgICAgIGlkPSJncmlkNTk4OSIgLz4gIDwvc29kaXBvZGk6bmFtZWR2aWV3PiAgPHBhdGggICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjFweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIiAgICAgZD0iTSAyNSAyNCBMIDE2IDMwIEwgMjUgMzYgTCAyNSAyNCB6IE0gMzUgMjQgTCAzNSAzNiBMIDQ0IDMwIEwgMzUgMjQgeiAiICAgICBpZD0icGF0aDU5OTUiIC8+PC9zdmc+);
}

</style>
