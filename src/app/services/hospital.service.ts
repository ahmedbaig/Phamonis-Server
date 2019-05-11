import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getOrigin } from '../origin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  origin : String = getOrigin()
  
  constructor(private http:HttpClient) { }

  getAll(token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.origin+"/api/hospital/all-hospitals/"+token,{
      headers: headers
    });
  } 

  createHospital(body:any, token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.post(this.origin+"/api/hospital/create/"+token, body, {
      headers: headers
    });
  }

  updateHospital(body:any, token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.post(this.origin+`/api/hospital/update/${token}`, body, {
      headers: headers
    });
  }
  
  detailHospital(id:String, token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.post(this.origin+`/api/hospital/detail/${token}?id=${id}`, {
      headers: headers
    });
  }

  deleteHospital(body:any, token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.post(this.origin+`/api/hospital/delete/${token}`, body, {
      headers: headers
    });
  }
}
