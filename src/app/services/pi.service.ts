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
    return this.http.get(this.origin+"/get-device-all/"+token,{
      headers: headers
    });
  }
}
