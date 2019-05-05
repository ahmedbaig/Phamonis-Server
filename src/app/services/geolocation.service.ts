import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private http: HttpClient) { }
  getIP():Observable<any>{
    return this.http.get('https://api.ipify.org/?format=json')
  }
  getData(ip:String):Observable<any>{
    return this.http.get(`http://api.ipstack.com/${ip}?access_key=81a228fe84a7c8b909dde00db7faa8e3`)
  }
}
