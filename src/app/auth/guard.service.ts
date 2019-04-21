import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private _auth:AuthServiceService, private route:Router) { }

  canActivate(){
    if(this._auth.isAuthenticated()){
      return true;
    }
    
    this.route.navigate(['/auth']);
    return false;
  }
}
