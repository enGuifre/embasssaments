<script>
  import { each } from "svelte/internal";

     export let thresholdScale;

     var labels=thresholdScale.domain.map((d,i)=>
     {
      if (i==0)
      {
        return "<= "+d.toString()+'%';
      }
      
      else
      {
        if (i==thresholdScale.domain.length-1)
        {
          return "> "+thresholdScale.domain[i-1]+'%';
        }
        else
        {
         
            
            return thresholdScale.domain[i-1].toString()+'-'+d.toString()+'%';
          
        
          
        }
      }
      
     });
     console.log(labels)
/*
let thresholdScale = {domain:[16, 25, 40, 60, 100],
  range:['#CCDFFF', '#A3B8FF', '#616EFF', '#3846D6','#2C3696']
  }; // Set the colors for each threshold

  */
</script>
<span>Nivell d'aigua</span>
{#each labels as label,i}
  <div class='scale_container'>
    <div>
    <div class='scale_color' style='background-color:{thresholdScale.range[i]}'></div>
    <div class='scale_value'>{label}</div>
    </div>
    
  </div>
{/each}
<style>
    .scale_container > div 
    {
        padding: 5px;
        display: flex;
    }

    .scale_color 
    {
      margin-top: 5px;
      width: 0.7rem;
    height: 0.7rem;
      border-radius: 50%;
      display: inline-block;
      /* margin-left: 5px; */
    
    }
    .scale_value
    {
      font-size: .7rem;
        width: 80%;
      height: auto;
      border-radius: 50%;
      display: inline-block;
      /* margin-left: 5px; */
      float: right;
    
    }
</style>