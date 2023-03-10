import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
  constructor( private userService: UserServiceService, private router: Router ) {};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserRole(route)
  }

  public role!: string;
  userId!: any;

  checkUserRole(route: ActivatedRouteSnapshot): Promise<boolean> {
    
    return new Promise(resolve => {
      this.userService.currentUserId.subscribe( id => {
        this.userService.getUser(id).subscribe(
          response => {
            this.role = response[0]['role'];
            
            if(this.role == route.data['role']){
              resolve(true);
            } else {
              resolve(false);
            }
        })
      })
    })
    
  }
  
}
