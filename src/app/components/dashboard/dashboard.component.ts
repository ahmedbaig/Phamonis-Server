import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { DataService } from 'src/app/services/data.service'; 
import Swal from 'sweetalert2';
import { NotificationService } from 'src/app/services/notification.service';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';  
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] 
})
export class DashboardComponent implements OnInit {

  user: any;
  image: String = ''
  user_images:any = []
  fullDate:any = []
  timestamp:any = []
  notifications: any = []
  constructor(private secureStorage:SecureStorageService, private route: Router, public _auth: AuthServiceService, private _service: DataService, private _notification:NotificationService) {}

  ngOnInit() {   
    if(this._auth.logged == false){
      this.route.navigate(['/auth'])
    }
    new Promise((resolve, reject)=>{
      this._auth.isAuthenticated()
      resolve(1)
    }).then(()=>{ 
      this._notification.getNotifications(this.secureStorage.getUserId(), JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
        this.notifications = res.unread
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
 
}
