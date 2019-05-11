import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service'; 
import { delay } from 'lodash'
import { SecureStorageService } from 'src/app/auth/secure-storage.service';
declare var $:any;
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {

  constructor(private route:Router, private _auth:AuthServiceService, private secureStorage:SecureStorageService) {}

  ngOnInit() { 
    this._auth.isAuthenticated()  
    if(this.secureStorage.getItem('session_t')!=null){
      this._auth.verifyToken(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res => {
        if (res.success) {  
          $('#loader').removeClass('hide')
          this.route.navigate(['/'])
        }else{
          $('#loader').addClass('hide')        
        }
      });
    }else{
      delay(()=>{
        $('#loader').addClass('hide')        
      }, 500)
    }
  }

  ngOnDestroy(){
    $('#loader').removeClass('hide')
  }

}
