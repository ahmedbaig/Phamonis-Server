import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { filter,delay,sortBy,reverse } from 'lodash'
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users:any = []
  patients: any = []
  doctors: any = []
  nurses: any = []
  constructor(private _user:UserService, private secureStorage:SecureStorageService, public _auth:AuthServiceService) { }

  ngOnInit() {
    delay(()=>{
      if(this._auth.role == 'admin'){
        this._user.getAllUsers(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
          this.users = reverse(sortBy(res.users,[function(o:any){return o.firstName},function(o:any){return o.lastName}]))
          this.patients = filter(this.users, (o)=>{ return o.role == 'user'})
          this.doctors = filter(this.users, (o)=>{ return o.role == 'doctor'})
          this.nurses = filter(this.users, (o)=>{ return o.role == 'nurse'})
        })
      }else if(this._auth.role == 'nurse'){
        this._user.getAllUsersPatients(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
          
          this.patients = reverse(sortBy(res.users,[function(o:any){return o.firstName},function(o:any){return o.lastName}]))
        })
        this._user.getAllUsersDoctors(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
              
          this.doctors = reverse(sortBy(res.users,[function(o:any){return o.firstName},function(o:any){return o.lastName}]))
        })
      }
    },1000)
  }

}
