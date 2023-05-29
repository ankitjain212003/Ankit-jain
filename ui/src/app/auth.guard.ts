import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){ }

  canActivate() {
      let mycookie = ""
      let cookies = document.cookie.split(";").forEach(cookie => {
        if (cookie.startsWith("login=")){
          mycookie = cookie.split("=")[1]
        }
      });
      if (mycookie == "true"){
        return true
      } else {
        this.router.navigate(['/login'])
        return false
      }
  }
  
}
