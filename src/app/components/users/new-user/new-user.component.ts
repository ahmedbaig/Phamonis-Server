import { Component, OnInit } from '@angular/core';
import { delay, filter } from 'lodash'
import { PiService } from 'src/app/services/pi.service';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';
import { DataService } from 'src/app/services/data.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HospitalService } from 'src/app/services/hospital.service';
declare var M:any;
declare var $:any
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  devices:any = []

  firstName:String = ""
  lastName:String = ""
  email:String = ""
  phone:String = ""
  gender:String = ""
  role:String = ""
  age:String = "" 
  constructor(private _pi:PiService, private _hospital:HospitalService, private secureStorage:SecureStorageService, private _user:UserService, private _auth:AuthServiceService, private router:Router) { }

  ngOnInit() { 
    this._pi.getAll(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
      this.devices = filter(res.devices, o=>{return o.user==""})
    })
    delay(()=>{
      M.AutoInit();
      $('select').formSelect();
    }, 1000)
  }

  userType(event:any){
    delay(()=>{
      M.AutoInit();
      $('select').formSelect();
    }, 1000)
  }

  saveUser(){
    let body = {
      firstName:this.firstName,
      lastName:this.lastName,
      email: this.email,
      password:"abc123123",
      phone: this.phone,
      gender:this.gender,
      role: this.role, 
      age:this.age
    }
    alert(this._auth.role)
    if(this._auth.role == 'admin'){
      this._user.createUserAdmin(body, JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
        if(res.success){ 
            this.router.navigate(['/']) 
        }else{
          Swal.fire("Opps", res.message, 'error')
        }
      })
    }
    if(this._auth.role == 'nurse'){
      this._user.createUser(body, JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
        if(res.success){
          this.router.navigate(['/'])          
        }else{
          Swal.fire("Opps", res.message, 'error')
        }
      })
    }
  }

}
