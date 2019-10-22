import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { delay } from 'lodash' 
import Swal from 'sweetalert2'
declare var app:any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  type: String = ""
  constructor(public _auth:AuthServiceService) { }

  ngOnInit() {
    delay(()=>{
      // Swal.fire({
      //   toast: true,
      //   position: 'top',
      //   showConfirmButton: false,
      //   timer: 3000,
      //   type: 'success',
      //   title: 'Signed in successfully'
      // });
      
      app.init();
    }, 2000)
  }

  changeRole(type:String){  
    this._auth.role = type
    this.type=this._auth.role
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      type: 'success',
      title: 'Role Changed'
    });
    
    app.init();
  }

}
