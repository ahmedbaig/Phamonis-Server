import { Injectable } from '@angular/core';
import { getOrigin } from '../origin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  origin: String = getOrigin()
  constructor(private http:HttpClient) { }
  
  getNotifications(id: String | null, token:String | null):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.origin+`/api/notification/read-all-notification/${id}/${token}`, {
      headers: headers
    });
  }
}
