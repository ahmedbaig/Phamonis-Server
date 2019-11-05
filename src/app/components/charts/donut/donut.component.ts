import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
declare var $:any;
declare var jquery:any;
declare var Chart:any;
declare var window:any;
import {map} from 'lodash'
@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent implements  OnInit, OnChanges  {

  @Input()
  data:any
  
  constructor() { }

  colors: String[] = ['#2ecc71', '#c0392b']

  ngOnChanges(change: SimpleChanges){
	// prepare the data    
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    let chart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				datasets: [{
					data:  
						this.data.data ,  
					backgroundColor: map(this.data.labels, d=>{return d=="true"?'#2ecc71':"#e74c3c"}) 
				}],
				labels: map(this.data.labels, d=>{return d=="true"?'Active Devices':"Inactive Devices"})
			},
			options: { 
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Devices Status'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				}
			}
		});
  } 

  ngOnInit() { 
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    let chart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				datasets: [{
					data:
						this.data.data, 
					backgroundColor: map(this.data.labels, d=>{return d=="true"?'#2ecc71':"#e74c3c"}) 
				}], 
				labels: map(this.data.labels, d=>{return d=="true"?'Active Devices':"Inactive Devices"})
			},
			options: { 
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Devices Status'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				}
			}
		});
  }

}
