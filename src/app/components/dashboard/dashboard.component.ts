import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { DataService } from 'src/app/services/data.service'; 
import Swal from 'sweetalert2';
import { NotificationService } from 'src/app/services/notification.service';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';  
import { delay, map } from 'lodash'
import * as moment from 'moment'
declare var $:any
declare var app:any
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] 
})
export class DashboardComponent implements OnInit, OnDestroy {

  user: any;
  image: String = ''
  user_images:any = []
  fullDate:any = []
  timestamp:any = []
  notifications: any = []
  constructor(public secureStorage:SecureStorageService, private route: Router, public _auth: AuthServiceService, private _service: DataService, private _notification:NotificationService) {}

  ngOnInit() {     
    delay(()=>{ 
      app.init();
    }, 2000)
    new Promise((resolve, reject)=>{
      this._auth.isAuthenticated()
      this._auth.verifyToken(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res => {
        if (!res.success) {  
          $('#loader').removeClass('hide')
          this.route.navigate(['/auth'])
        }else{
          this._auth.role = res.user.role
          $('#loader').addClass('hide')          
        }
      });
      resolve(1)
    }).then(()=>{ 
      this._notification.getNotifications(this.secureStorage.getUserId(), JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
        this.notifications = res.unread
        map(res.unread, unread=>{
          this.timestamp[unread._id] = moment(unread.createdt).format("LLLL")
        })
      })  
    })
  }


  logout(){ 
    this._service.logout(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
      if(res.success){
        this._auth.clear()
        this.route.navigate(['/auth'])
      }else{
        Swal.fire("Opps", res.message, 'error')
      }
    })
  }
  read(id:String){
    this._notification.readNotification(id, JSON.parse(this.secureStorage.getItem('session_t')).jwt, this._auth.getUser()._id).subscribe(res=>{
      this._notification.getNotifications(this.secureStorage.getUserId(), JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
        this.notifications = res.unread
        map(res.unread, unread=>{
          this.timestamp[unread._id] = moment(unread.createdt).format("LLLL")
        })
      })
    })
  }
  ngOnDestroy(){
    $('#loader').removeClass('hide')
  }
}
