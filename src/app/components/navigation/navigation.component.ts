import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { delay } from 'lodash' 
declare var app:any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  type: String = ""
  constructor(private _auth:AuthServiceService) { }

  ngOnInit() {
    delay(()=>{
      this.type=this._auth.getRole()
    }, 1000)
  }

  changeRole(type:String){
    this._auth.role = type
    this.type=this._auth.role
    app.init();
  }

}
