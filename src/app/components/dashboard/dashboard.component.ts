import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { DataService } from 'src/app/services/data.service';
import { delay } from 'lodash'
import Swal from 'sweetalert2';
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
    app.init();
  }


  logout(){
    this._service.logout(localStorage.getItem('session_t')).subscribe(res=>{
      if(res.success){
        this._auth.clear()
        this.route.navigate(['/auth'])
      }else{
        Swal.fire("Opps", res.message, 'error')
      }
    })
  }

}
