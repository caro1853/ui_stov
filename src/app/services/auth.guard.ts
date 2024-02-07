import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login.service";

//@Injectable({
//    providedIn: 'root'
//  })
//export class AuthDcotorGuard implements CanActivate {
//    constructor(private _loginService: LoginService, private _router: Router) { }
//    
//    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//        if (this._loginService.getTokenSaved()) {
//            return true;
//        }
//        this._router.navigate(['/auth']);
//        return false;
//    }
//}

@Injectable({
    providedIn: 'root'
  })
  class PermissionsService {
  
    constructor(private router: Router, private _loginService: LoginService) {}
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      debugger;
      if (this._loginService.getTokenSaved()) {
        return true;
      }
      this.router.navigate(['/auth']);
      return false;
    }
  }
  
  export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(PermissionsService).canActivate(next, state);
  }