import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

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
  
  
  colors: String[] = ['#2ecc71', '#3498db']

  constructor() { }

  ngOnChanges(change: SimpleChanges){
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var config = {
			type: 'line',
			data: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [{
					backgroundColor: this.colors[0],
					borderColor: this.colors[1],
					data: [
            10.,152,145,10,152,145,10,152,145,10,152,145
					],
					fill: false,
				} ]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'Poses Recognized'
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
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var config = {
			type: 'line',
			data: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [{ 
					backgroundColor: this.colors[0],
					borderColor: this.colors[1],
					data: [
            10,152,145,10,152,145,10,152,145,10,152,145,10,152,145,10,152,145,
					],
					fill: false,
				} ]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'Poses Recongnized'
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
							labelString: 'Value'
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
