import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  registerForm!: FormGroup; 
  submitted:boolean = false
  constructor(private formBuilder: FormBuilder, private route:Router, private router:ActivatedRoute, private _service: DataService, private _auth: AuthServiceService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({ 
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
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
    let body = {password: this.registerForm.value.password}
    this._service.resetPassword(body, this.router.snapshot.params['token']).subscribe(res=>{
      if(res.success){
        this.route.navigate(['/auth'])
        Swal.fire("Success", res.message, 'success')        
      }else{
        Swal.fire("Opps", res.message, 'error')
      }
    })


  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
}
