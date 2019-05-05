import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service'; 
import { GeolocationService } from 'src/app/services/geolocation.service'; 
import { SecureStorageService } from 'src/app/auth/secure-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

  registerForm!: FormGroup; 
  submitted:boolean = false
  constructor(private secureStorage:SecureStorageService, private geoLocation:GeolocationService, private formBuilder: FormBuilder, private _service: DataService, private _auth: AuthServiceService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({ 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], 
    });
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  send(){ 
    this.submitted = true
    // stop here if form is invalid
    if (this.registerForm.invalid) { 
      return;
    }
    let ip_:String = "0.0.0.0" 
    let data:any = {}
    this.geoLocation.getIP().subscribe(ipResponse=>{
      ip_ = ipResponse.ip
      this.geoLocation.getData(ip_).subscribe(dataResponse=>{
        data = dataResponse 
        let body = {email: this.registerForm.value.email, password: this.registerForm.value.password, data:data}
        this._service.login(body).subscribe(res=>{
          if(res.success){
            if(this.secureStorage.setUserId(res.user.user) == true){
              let secureSession = {
                jwt: res.token, 
                appName: navigator.appName, 
                appCodeName: navigator.appCodeName, 
                appVersion: navigator.appVersion,
                ip: ip_,
                e_ip: data.ip
              }
              if(this.secureStorage.setItem('session_t', secureSession)==true){
                this._auth.token = res.token 
                this._auth.isAuthenticated()
              }
            }
          }else{
            Swal.fire("Opps", res.message, 'error')
          }
        })
      })
    })



  }

}
