import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getOrigin } from '../origin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  origin = getOrigin();

  constructor(public http:HttpClient) {
  }

  getDashboard(token:String):Observable<any>{
    return this.http.get(this.origin+`/api/stats/dashboard-stats/${token}`)
  }
}
