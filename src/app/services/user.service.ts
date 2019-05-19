import { Injectable } from '@angular/core';
import { getOrigin } from '../origin';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  origin: String = getOrigin()
  constructor(private http:HttpClient) { }
  
  getUser(id: String, token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.origin+`/api/user/get-user/${id}/${token}`, {
      headers: headers
    });
  }

  getAllUsers(token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.origin+`/api/user/get-users/${token}`, {
      headers: headers
    });
  }

  createUserAdmin(body:any, token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.post(this.origin+`/api/user/new-user-admin/${token}`, body, {
      headers: headers
    });
  }

  createUser(body:any, token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.post(this.origin+`/api/user/new-user/${token}`, body, {
      headers: headers
    });
  }

  addQualification(data:FormData, token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.post(this.origin+`/api/user/upload-qualification/${token}`, data, {
      headers: headers
    });
  }

}
