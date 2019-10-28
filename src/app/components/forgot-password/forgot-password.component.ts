import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  registerForm!: FormGroup; 
  submitted:boolean = false
  constructor(private formBuilder: FormBuilder, private route:Router, private _service: DataService, private _auth: AuthServiceService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({ 
      email: ['', [Validators.required, Validators.email]]
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
    let body = {email: this.registerForm.value.email}
    this._service.forgotPassword(body).subscribe(res=>{
      if(res.success){
        this.route.navigate(['/auth'])
        Swal.fire("Success", res.message, 'success')        
      }else{
        Swal.fire("Opps", res.message, 'error')
      }
    })


  }
}
