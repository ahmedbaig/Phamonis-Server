import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
declare var $:any; 
declare var jqxSchedular:any;  
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    data: any;
    constructor(public _auth:AuthServiceService) { }
    ngOnInit(){
        this.data = [
          {
            id: "id1",
            description: "George brings projector for presentations.",
            location: "",
            subject: "Quarterly Project Review Meeting",
            calendar: "Room 1",
            start: new Date(2017, 10, 23, 9, 0, 0),
            end: new Date(2017, 10, 23, 16, 0, 0)
          },
          {
            id: "id2",
            description: "",
            location: "",
            subject: "IT Group Mtg.",
            calendar: "Room 2",
            start: new Date(2017, 10, 24, 10, 0, 0),
            end: new Date(2017, 10, 24, 15, 0, 0)
          },
          {
            id: "id3",
            description: "",
            location: "",
            subject: "Course Social Media",
            calendar: "Room 3",
            start: new Date(2017, 10, 27, 11, 0, 0),
            end: new Date(2017, 10, 27, 13, 0, 0)
          }
        ]
    }
}
