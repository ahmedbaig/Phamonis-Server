import { Component, OnInit } from '@angular/core';
import { PiService } from 'src/app/services/pi.service';
import { UserService } from 'src/app/services/user.service';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { delay, filter } from 'lodash'
declare var $:any;
declare var M:any;
@Component({
  selector: 'app-create-hardware',
  templateUrl: './create-hardware.component.html',
  styleUrls: ['./create-hardware.component.css']
})
export class CreateHardwareComponent implements OnInit {
  model:String = ""
  serial_number:String = ""
  active: Boolean = false;
  status:Boolean = false
  user:String = ""
  users:any = []
  threshold:number = 0
  constructor(private router:Router, private _piService: PiService, private _userService: UserService, private secureStorage:SecureStorageService) { }

  ngOnInit() { 
    this._userService.getAllUsers(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
      this.users = filter(res.users, o=>{return o.role=='user'}) 
      delay(()=>{
        M.AutoInit();
        $('select').formSelect();
      }, 1000)
    })
  }

  userChange(event:any){
    this.user = event.target.value
  } 

  save(){
    if(this.model == ""){
      Swal.fire("Opps", "Model name cannot be blank", "error")
      return 
    }
    if(this.serial_number == ""){
      Swal.fire("Opps", "Serial number cannot be blank", "error")
      return 
    }
    if(this.threshold == 0){
      Swal.fire("Opps", "Still threshold cannot be 0", "error")
      return 
    }
    let body = {model: this.model, serial_number: this.serial_number, active: this.active, status: this.status, user: this.user, threshold: this.threshold}
    this._piService.createDevice(body, JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
      if(res.success){
        Swal.fire(res.message, "Please reboot device for updates", "success")        
        this.router.navigate(['/pi'])
      }else{
        Swal.fire("Opps", res.message, "error")
      }
    })
  }
}
