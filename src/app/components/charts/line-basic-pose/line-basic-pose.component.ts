import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {map} from 'lodash'
import * as moment from 'moment'
declare var $:any;
declare var jquery:any;
declare var Chart:any;
declare var window:any;

@Component({
  selector: 'app-line-basic-pose',
  templateUrl: './line-basic-pose.component.html',
  styleUrls: ['./line-basic-pose.component.css']
})
export class LineBasicPoseComponent implements   OnInit, OnChanges  {

  @Input()
  data:any
  
  
  colors: String[] = ['#2ecc71', '#3498db', '#f1c40f', '#2d3436', '#a29bfe', '#ffeaa7']

  constructor() { }

  ngOnChanges(change: SimpleChanges){
	var config = {
		type: 'line',
		data: {
			labels: map(this.data.labels, date=>{return moment(date).format("LL")}),
			datasets: [{
				backgroundColor: this.colors[Math.floor(Math.random() * 5)],
				borderColor:this.colors[Math.floor(Math.random() * 5)],
				data:this.data.data,
				fill: false,
			} ]
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: 'Device Released'
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			},
			legend: {
			display: false
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Month'
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Released'
					}
				}]
			}
		}
    };
    
    
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('line-pose-canvas');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
			let chart = new Chart(ctx, config);
  }
  ngOnInit() {
	var config = {
		type: 'line',
		data: {
			labels: map(this.data.labels, date=>{return moment(date).format("LL")}),
			datasets: [{
				backgroundColor: this.colors[Math.floor(Math.random() * 5)],
				borderColor:this.colors[Math.floor(Math.random() * 5)],
				data:this.data.data,
				fill: false,
			} ]
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: 'Device Released'
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			},
			legend: {
			display: false
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Month'
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Released'
					}
				}]
			}
		}
    };
    
    
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('line-pose-canvas');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
			let chart = new Chart(ctx, config);
  }
}
