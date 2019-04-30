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
  role:String = "";
  logged: Boolean = false;
  origin: String = getOrigin();
  constructor(private http: HttpClient, private route: Router) { }

   isAuthenticated(){
    if (localStorage.getItem('session_t') != null) {
      this.isTokenExpired(localStorage.getItem('session_t'));
    } else {
      this.clear();
      this.route.navigate(['/auth']);
    }
  }

  isTokenExpired(token: any) {
    this.verifyToken(token).subscribe(res => {
      if (res.success) {
        this.user = res.user;
        this.role = res.user.role
        this.logged = true;
        this.route.navigate(['/']);
      } else {
        this.clear();
        this.route.navigate(['/auth']);
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
    localStorage.removeItem('session_t');
    this.user = {};
    this.role = ""
  }

  verifyToken(token: String): Observable<any> {
    return this.http.get(this.origin + '/api/userSession/verify?token=' + token);
  }
}
