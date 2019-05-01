import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

  registerForm!: FormGroup; 
  submitted:boolean = false
  constructor(private formBuilder: FormBuilder, private _service: DataService, private _auth: AuthServiceService) { }

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
    let body = {email: this.registerForm.value.email, password: this.registerForm.value.password}
    this._service.login(body).subscribe(res=>{
      if(res.success){
        localStorage.setItem('session_t', res.token)
        this._auth.isAuthenticated()
      }else{
        Swal.fire("Opps", res.message, 'error')
      }
    })


  }

}
