import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Deactivate } from '../models/deactivate';

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuard implements CanDeactivate<Deactivate> {
  // canDeactivate(
  //   component: unknown,
  //   currentRoute: ActivatedRouteSnapshot,
  //   currentState: RouterStateSnapshot,
  //   nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  canDeactivate( component: Deactivate ) {
    return component.SalirDeRuta ? component.SalirDeRuta(): true;
  }
  
}
