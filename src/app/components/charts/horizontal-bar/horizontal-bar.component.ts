import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {map} from 'lodash'
declare var $:any;
declare var jquery:any;
declare var Chart:any;
declare var window:any;


@Component({
  selector: 'app-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.css']
})
export class HorizontalBarComponent implements  OnInit, OnChanges  {

  @Input()
  data:any
  
  colors: String[] = ['#2ecc71', '#3498db', '#f1c40f', '#2d3436', '#a29bfe', '#ffeaa7']
  constructor() { }

  ngOnChanges(change: SimpleChanges){   
    var horizontalBarChartData = { 
      datasets: 
      map(this.data.labels, label=>{
        let color = this.colors[Math.floor(Math.random() * 5)]
        return Object.create({ 
            label:label,
            backgroundColor: color,
            borderColor:color,
            data: [this.data.data[this.data.labels.indexOf(label)]]
          })
        })

    };
    
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('horizontal-canvas');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    window.myHorizontalBar = new Chart(ctx, {
      type: 'horizontalBar',
      data: horizontalBarChartData,
      options: {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          rectangle: {
            borderWidth: 2,
          }
        },
        responsive: true,
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Signed Up Users'
        }
      }
    });
  }

  ngOnInit() { 
    var horizontalBarChartData = { 
      datasets: 
      map(this.data.labels, label=>{
        let color = this.colors[Math.floor(Math.random() * 5)]
          return Object.create({ 
            label:label,
            backgroundColor: color,
            borderColor:color,
            data: [this.data.data[this.data.labels.indexOf(label)]]
          })
        })
    };
    
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('horizontal-canvas');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    window.myHorizontalBar = new Chart(ctx, {
      type: 'horizontalBar',
      data: horizontalBarChartData,
      options: {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          rectangle: {
            borderWidth: 2,
          }
        },
        responsive: true,
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Signed Up Users'
        }
      }
    });
  }

}
