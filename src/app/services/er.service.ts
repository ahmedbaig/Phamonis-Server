import { Injectable } from '@angular/core';
import { getOrigin } from '../origin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErService {

  origin : String = getOrigin()
  
  constructor(private http:HttpClient) { }

  getAll(token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.origin+"/api/emergency/get-requests/"+token,{
      headers: headers
    });
  } 
  
  getAllUser(token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.origin+"/api/emergency/get-user-requests/"+token,{
      headers: headers
    });
  } 

  check(request:String, token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.origin+`/api/emergency/request-status/${request}/${token}`, {
      headers: headers
    });
  }
}
