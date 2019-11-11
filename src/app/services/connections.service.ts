import { Injectable } from '@angular/core';
import { getOrigin } from '../origin';
import { HttpClient } from '@angular/common/http';
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
}
