"use client";
import { csv } from 'd3';

import { OrgChart } from 'd3-org-chart';
import { render } from 'react-dom';
export default function RolesChart() {
    let chart: OrgChart<unknown>;
    function filterChart(e) {
        // Get input value
        const value = e.srcElement.value;
    
        // Clear previous higlighting
        chart.clearHighlighting();
    
        // Get chart nodes
        const data = chart.data();
    
        // Mark all previously expanded nodes for collapse
        data.forEach((d) => (d._expanded = false));
    
        // Loop over data and check if input value matches any name
        data.forEach((d) => {
          if (value != '' && d.name.toLowerCase().includes(value.toLowerCase())) {
            // If matches, mark node as highlighted
            d._highlighted = true;
            d._expanded = true;
          }
        });
    
        // Update data and rerender graph
        chart.data(data).render().fit();
    
        console.log('filtering chart', e.srcElement.value);
      };

    const renderChart = () => {
        
        
        console.log("triggered");
        csv("raw.csv").then((graphData) => {
           chart= new OrgChart().nodeHeight((d) => 85 + 25)
            .nodeWidth((d) => 220 + 2)
            .childrenMargin((d) => 50)
            .compactMarginBetween((d) => 35)
            .compactMarginPair((d) => 30)
            .neighbourMargin((a, b) => 20)
            .nodeContent((d, i, arr, state) =>{
              const color = '#FFFFFF';
              const imageDiffVert = 25 + 2;
              return `
                      <div style='width:${
                        d.width
                      }px;height:${d.height}px;padding-top:${imageDiffVert - 2}px;padding-left:1px;padding-right:1px'>
                              <div style="font-family: 'Inter', sans-serif;background-color:${color};  margin-left:-1px;width:${d.width - 2}px;height:${d.height - imageDiffVert}px;border-radius:10px;border: 1px solid #E4E2E9">
                                  <div style="display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">#${
                                    d.data.id
                                  }</div>
                                  <div style="background-color:${color};margin-top:${-imageDiffVert - 20}px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" ></div>
                                  <div style="margin-top:${
                                    -imageDiffVert - 20
                                  }px;">   <img src=" ${d.data.image}" className="shadow-lg" style="margin-left:${20}px;border-radius:100px;width:40px;height:40px;" /></div>
                                  <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:10px">  ${
                                    d.data.name
                                  } </div>
                                  <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${
                                    d.data.position
                                  } </div>
      
                              </div> 
                          </div>
                                  `}).container("#roles").data(graphData).render();
            return null;
        }).catch(e => { })
        return null;
    }
    return (
        <div className="w-4/5 h-auto border shadow-lg rounded-lg text-center m-auto bg-gray-100 p-4">
            <input
  type="search"
  placeholder="search by name"
  className="m-auto rounded-lg shadow-lg px-2 py-1"
  onBlur={()=>filterChart(event)}
/>
        <div className="h-2/3 m-auto text-center justify-center" id="roles">{renderChart()}</div>
        </div>
    )

}