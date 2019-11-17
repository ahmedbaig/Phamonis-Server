import { Injectable } from '@angular/core';
import { getOrigin } from '../origin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {
  origin = getOrigin();

  constructor(public http:HttpClient) {
  }

  getCode(token:String):Observable<any>{
    return this.http.get(this.origin+`/api/connections/connections-string/${token}`)
  }
  
  addConnection(body:any, token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json'); 
    return this.http.post(this.origin+`/api/connections/add-connection/${token}`, body, {
      headers: headers
    });
  }
  
  declineConnection(connectionId:String, token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    let body = {connectionId} 
    return this.http.post(this.origin+`/api/connections/decline-connection/${token}`, body, {
      headers: headers
    });
  }

  
  undeclineConnection(connectionId:String, token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    let body = {connectionId} 
    return this.http.post(this.origin+`/api/connections/undecline-connection/${token}`, body, {
      headers: headers
    });
  }
  
  approveConnection(connectionId:String, token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json'); 
    let body = {connectionId} 
    return this.http.post(this.origin+`/api/connections/accept-connection/${token}`, body, {
      headers: headers
    });
  }   
  
  userConnections(token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json'); 
    return this.http.get(this.origin+`/api/connections/connections-list/${token}`, {
      headers: headers
    });
  }

  
  staffConnection(token:String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json'); 
    return this.http.get(this.origin+`/api/connections/connections-list-staff/${token}`, {
      headers: headers
    });
  }
}
