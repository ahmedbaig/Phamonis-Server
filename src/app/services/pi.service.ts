import { Injectable } from '@angular/core';
import { getOrigin } from '../origin';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PiService {

  origin : String = getOrigin()
  
  constructor(private http:HttpClient) { }

  getAll(token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.origin+"/api/pi/get-device-all/"+token,{
      headers: headers
    });
  } 
  getDevice(token:String, device: String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.origin+`/api/pi/get-device-detail/${token}/${device}`,{
      headers: headers
    });
  }
  getDeviceUser(token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.origin+`/api/pi/get-device-detail-user/${token}`,{
      headers: headers
    });
  }
  removeDevice(token:String, device: String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.origin+`/api/pi/remove-device/${token}/${device}`,{
      headers: headers
    });
  }
  createDevice(body:any, token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.post(this.origin+"/api/pi/create-device/"+token, body, {
      headers: headers
    });
  }

  updateDevice(body:any, token:String, device:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.post(this.origin+`/api/pi/update-device/${token}/${device}`, body, {
      headers: headers
    });
  }
  updateDeviceUser(body:any, token:String, device:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.post(this.origin+`/api/pi/update-device-user/${token}/${device}`, body, {
      headers: headers
    });
  }
}
