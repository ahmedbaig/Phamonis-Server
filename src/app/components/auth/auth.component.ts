import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service'; 
import { delay } from 'lodash'
import { SecureStorageService } from 'src/app/auth/secure-storage.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private route:Router, private _auth:AuthServiceService, private secureStorage:SecureStorageService) {}

  ngOnInit() { 
    this._auth.isAuthenticated()  
    this._auth.verifyToken(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res => {
      if (res.success) {  
        this.route.navigate(['/'])
      }
    });
  }

}
