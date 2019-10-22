import { Component,ViewEncapsulation } from '@angular/core';
import { DataService } from './services/data.service'; 
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private AuthService:DataService, private _auth:AuthServiceService){}

  ngOnInit(): void { 
    this._auth.isAuthenticated()
  }
 
}
