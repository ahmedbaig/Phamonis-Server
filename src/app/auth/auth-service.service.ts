import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { getOrigin } from '../origin';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { GeolocationService } from '../services/geolocation.service';
import { SecureStorageService } from './secure-storage.service';
import Swal from 'sweetalert2';
declare var app:any;
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user: any = {};
  image: String = ""
  role:String = "";
  token:String = "";
  logged: Boolean = false;
  origin: String = getOrigin();
  constructor(private geoLocation:GeolocationService, 
    private secureStorage:SecureStorageService, 
    private http: HttpClient, 
    private route: Router, 
    private _service: DataService,
    private router:ActivatedRoute ) { }

   isAuthenticated(){
    if (this.secureStorage.getItem('session_t') != null) {
      return this.isTokenExpired(JSON.parse(this.secureStorage.getItem('session_t')));
    } else {
      this.clear();
      //Dont know why this was there -- why was this here -- Because on reset passwords it needs to hold position
      // I know why this there. Because when there is nothing in storage it'll bounce back
      this.route.navigate(['/auth']);
      return false
    }
  }

  isTokenExpired(data: any) {
    this.geoLocation.getIP().subscribe(ipResponse=>{ 
      this.geoLocation.getData(ipResponse.ip).subscribe(dataResponse=>{
        if(navigator.appVersion!==data.appVersion&&
          navigator.appCodeName!==data.appCodeName&&
          navigator.appName!==data.appName&&
          data.ip!==ipResponse.ip&&
          data.e_ip!==dataResponse.ip){
          this.clear()
          Swal.fire("Opps", "There was a problem in the system. Please log in again", 'error')
          this.route.navigate(['/auth']);
          return false;
        }
      })
    })
    this.verifyToken(data.jwt).subscribe(res => {
      if (res.success) {
        this.user = res.user; 
        this.token = data.jwt
        this.role = res.user.role
        this.logged = true;  
        this.image = this._service.getUserImage(this.user.profilePicture)
        app.init(); 
        return true
      } else {
        this.clear(); 
        return false;
      }
    });
  }

  getUser(){
    return this.user
  }

  getRole(){
    return this.role
  }

  clear() {  
    this.logged = false,
    this.secureStorage.removeItem('session_t');
    this.secureStorage.removeItem('USER_ID');
    this.user = {};
    this.image = "";
    this.token = "";
    this.role = ""
  }

  verifyToken(token: String): Observable<any> {
    return this.http.get(this.origin + '/api/userSession/verify?token=' + token);
  }
}
