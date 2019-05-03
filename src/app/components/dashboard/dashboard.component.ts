import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { DataService } from 'src/app/services/data.service';
import { delay } from 'lodash'
import Swal from 'sweetalert2';
import { NotificationService } from 'src/app/services/notification.service';
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
  user_images:any = []
  fullDate:any = []
  timestamp:any = []
  notifications: any = []
  constructor(private route: Router, public _auth: AuthServiceService, private _service: DataService, private _notification:NotificationService) {}

  ngOnInit() { 
    new Promise((resolve, reject)=>{
      this._auth.isAuthenticated()
      resolve(1)
    }).then(()=>{
      this._notification.getNotifications(localStorage.getItem('session_u'), localStorage.getItem('session_t')).subscribe(res=>{
        this.notifications = res.unread
      }) 
      delay(()=>{ 
      }, 1000)
    })
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
