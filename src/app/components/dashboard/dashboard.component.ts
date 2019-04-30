import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { DataService } from 'src/app/services/data.service';
import { delay } from 'lodash'
declare var $: any;
declare var app:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any = {};
  image: String = ''
  constructor(private route: Router, private _auth: AuthServiceService, private _service: DataService) {}

  async ngOnInit() { 
    this._auth.isAuthenticated();
    this.user = this._auth.getUser();
    console.log(this.user)
    this.image = this._service.getUserImage(this.user.profilePicture)
    app.init();
  }

}
