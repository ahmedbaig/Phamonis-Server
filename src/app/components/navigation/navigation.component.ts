import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { delay } from 'lodash' 
import Swal from 'sweetalert2'
import { getOrigin } from 'src/app/origin';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';
declare var app:any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  type: String = ""
  messages:String = ""
  public origin:String = getOrigin()
  constructor(public _auth:AuthServiceService, private secureStorage:SecureStorageService) { }
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
      this.messages = this.origin+"/chat?t="+JSON.parse(this.secureStorage.getItem('session_t')).jwt+"&r=d"
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
