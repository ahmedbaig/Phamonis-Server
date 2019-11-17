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
import * as moment from 'moment';
declare var M:any;
declare var $:any
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  devices:any = []
  hospitals:any = []
  hospital:String = ""
  position:String = ""
  firstName:String = ""
  lastName:String = ""
  email:String = ""
  phone:String = ""
  gender:String = ""
  role:String = ""
  full_name:String = ""
  login:String = ""
  cid:String = ""
  cemail:String = ""
  dateOfBirth:String = "" 
  constructor(private _pi:PiService, private _hospital:HospitalService, private secureStorage:SecureStorageService, private _user:UserService, private _auth:AuthServiceService, private router:Router) { }

  ngOnInit() { 
    this._hospital.getAll(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
      this.hospitals = res.hospitals
    })
    this._pi.getAll(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
      this.devices = filter(res.devices, o=>{return o.user==""})
    })
    delay(()=>{
      M.AutoInit();
      $('select').formSelect();
      $('.datepicker').datepicker();
      $('.datepicker').attr('style', 'bottom:unset!important')
    }, 1000)
  }

  userType(event:any){
    delay(()=>{
      M.AutoInit();
      $('select').formSelect();
      $('.datepicker').datepicker();
      $('.datepicker').attr('style', 'bottom:unset!important')
    }, 1000)
  }

  saveUser(){ 

    if(
      this.full_name!= ""&&
      this.login!= ""&&
      this.cid!= ""&&
      this.cemail!= ""){
        let body = {
          full_name: this.full_name,
          login:this.login,
          cid: this.cid,
          cemail: this.cemail
        }
        this._user.createUserAdminChat(body, JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
          
        })
      }

    this.dateOfBirth = $('#dob').val(); 
    let body = {
      firstName:this.firstName,
      lastName:this.lastName,
      email: this.email,
      password:"abc123123",
      hospital: this.hospital,
      position: this.position,
      phone: this.phone,
      gender:this.gender,
      role: this.role, 
      dateOfBirth:this.dateOfBirth
    }
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
