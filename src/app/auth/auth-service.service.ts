import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { getOrigin } from '../origin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user: any = {};
  logged: Boolean = false
  origin:String = getOrigin();
  constructor(private http:HttpClient, private route:Router) { }

  isAuthenticated(){
    if(localStorage.getItem('session_t')!=null&&localStorage.getItem('session_t')!=undefined){
      if(this.isTokenExpired(localStorage.getItem('session_t'))){
        return true;
      }
      return false;
    }
    return false;
  }

  isTokenExpired(token:String): boolean {
    this.verifyToken(token).subscribe(res=>{
      if(res.success){
        this.user = res.user;
        return true;
      }

      return false;
    })
    return false;
  }

  clear(){
    this.logged = false,
    this.user = {};
  }

  verifyToken(token:String):Observable<any>{
    return this.http.get(this.origin+"/api/userSession/verify?token="+token)
  }
}
