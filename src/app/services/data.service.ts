import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getOrigin } from '../origin';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  origin = getOrigin();

  constructor(public http:HttpClient) {

  }

  getUserImage(filename: String){
    return this.origin+"/dist-user-images/"+filename
  }
  
  getUserQualification(filename: String){
    return this.origin+"/dist-user-qualification/"+filename
  }
  
  verifyUser(id: String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.origin+"/api/userSession/verify/?token="+id, {
      headers: headers
    });
  }
  login(body: any):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.post(this.origin+"/api/user/login-user", body,  {
      headers: headers
    });
  }
  logout(id: any):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.origin+"/api/userSession/logout/?token="+id, {
      headers: headers
    });
  }
  
  activateAccount(token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.origin+"/api/user/activate-account"+token,{
      headers: headers
    });
  }
  forgotPassword(body:any):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.post(this.origin+"/api/user/send-forgot-password-email", body,{
      headers: headers
    });
  }
  resetPassword(body:any, forgotPasswordToken: String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.post(this.origin+"/api/user/reset-password/"+forgotPasswordToken, body,{
      headers: headers
    });
  }

  checkService(phone:String, code:String, sid:String, data:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization_Token': 'AC3bc2f767a2795d5f061cfa191682357f',
      'Service_ID': 'VA7251cff344c374298a98f518076da207',
     })
    let body = {
      phone, code, sid, data
    }
    return this.http.post(this.origin+"/api/verify/check-verification", body,{
      headers: headers
    });
  }
  
  verifyService(phone:String, data: any):Observable<any>{
    const headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization_Token': 'AC3bc2f767a2795d5f061cfa191682357f',
        'Service_ID': 'VA7251cff344c374298a98f518076da207',
       })
    let body = {
      phone, data
    }
    return this.http.post(this.origin+"/api/verify/verification-sms", body,{
      headers: headers
    });
  }
  

}
