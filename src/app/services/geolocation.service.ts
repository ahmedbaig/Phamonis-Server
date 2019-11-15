import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private ipdataKey:String = "6ada2602972c4f74e64a896085df8b7033b990189a7948ae228e1581"
  private ipstackKey:String = "bd932c80f00e4b0508e6480f566829c6"
  private googlemapKey:String = "AIzaSyDPsjruvzn9yC2aqG-f2o0AQKHUNjKeBsw"
  constructor(private http: HttpClient) { }
  getIP():Observable<any>{
    return this.http.get('https://api.ipify.org/?format=json')
  }
  getData(ip:String):Observable<any>{
    return this.http.get(`https://api.ipdata.co/${ip}?api-key=${this.ipdataKey}`)
    // return this.http.get(`http://api.ipstack.com/${ip}?access_key=${this.ipdataKey}`)
    
  }
  getMapSrc(lat:String, long:String){
    return `https://www.google.com/maps/embed/v1/place?q=${lat},${long}&key=${this.googlemapKey}`
  }
}
