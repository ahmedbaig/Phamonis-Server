import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service'; 
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private route:Router, private _auth:AuthServiceService) {}

  ngOnInit() {  
    this._auth.isAuthenticated()
    if(this._auth.logged == true){
      this.route.navigate(['/'])
    }
  }

}
