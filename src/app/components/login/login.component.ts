import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service'; 
import { GeolocationService } from 'src/app/services/geolocation.service'; 
import { SecureStorageService } from 'src/app/auth/secure-storage.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
declare var $:any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

  registerForm!: FormGroup; 
  submitted:boolean = false

 
  sid:String = ""
  code:String = ""
  phone:String = ""

  data:any;
  
  ip_:String = "0.0.0.0" 
  constructor(private secureStorage:SecureStorageService, private _userService:UserService, private geoLocation:GeolocationService, private formBuilder: FormBuilder, private _service: DataService, private _auth: AuthServiceService, private route:Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({ 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], 
    });
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  validatorSMS(){

  }

  checkCode(){
    if(this.code==null){
      Swal.fire('Error', "Please enter SMS code", 'error')
      return
    }
    
    if(this.code.length > 6){
      Swal.fire('Error', "Code length exceeding. PLease verify", 'error')
      return
    }
    
    if(this.code.length < 6){
      Swal.fire('Error', "Code length too short. PLease verify", 'error')
      return
    }

    this._service.checkService(this.phone, this.code, this.sid, this.data).subscribe(check=>{
      if(check.verification.valid == false){
        Swal.fire('Error', "The code you entered is not valid ", 'error')
        return 
      }

      if(check.verification.valid == true){ 
        if(this.secureStorage.setUserId(check.data._id) == true){
          let secureSession = {
            jwt: check.token, 
            appName: navigator.appName, 
            appCodeName: navigator.appCodeName, 
            appVersion: navigator.appVersion,
            ip: this.ip_,
            e_ip: this.data.ip
          }
          if(this.secureStorage.setItem('session_t', secureSession)==true){ 
            this._auth.token = check.token 
            this._auth.isAuthenticated()
            this.route.navigate(['/']);
          }
        }
        $('.close').trigger('click')
      }
    })
     
  }

  send(){ 
    this.submitted = true
    // stop here if form is invalid
    if (this.registerForm.invalid) { 
      return;
    }
    
    this.geoLocation.getIP().subscribe(ipResponse=>{
      this.ip_ = ipResponse.ip
      this.geoLocation.getData(this.ip_).subscribe(dataResponse=>{
        this.data = dataResponse 
        let body = {email: this.registerForm.value.email, password: this.registerForm.value.password, data:this.data}
        this._service.login(body).subscribe(res=>{
          if(res.success){
            this._userService.getUser(res.user.user, res.token).subscribe(userResponse=>{
              if(userResponse.success){
                if(userResponse.user.role=="admin"){ 
                  if(this.secureStorage.setUserId(res.user.user) == true){
                    let secureSession = {
                      jwt: res.token, 
                      appName: navigator.appName, 
                      appCodeName: navigator.appCodeName, 
                      appVersion: navigator.appVersion,
                      ip: this.ip_,
                      e_ip: this.data.ip
                    }
                    if(this.secureStorage.setItem('session_t', secureSession)==true){ 
                      this._auth.token = res.token 
                      this._auth.isAuthenticated()
                      this.route.navigate(['/']);
                    }
                  } 
                  return 
                }
                this._service.verifyService(userResponse.user.phone, this.data).subscribe(async verification=>{
                  if(verification.success){
                    this.phone = userResponse.user.phone
                    this.sid = verification.sid 
                    $('#launchCode').trigger('click') 
                    return 
                  }else{
                    Swal.fire("Opps", verification.message, 'error')
                  }
                }) 
              }
            })
          }else{
            Swal.fire("Opps", res.message, 'error')
          }
        })
      })
    })



  }

}
