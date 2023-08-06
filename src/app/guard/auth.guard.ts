// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../service/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor( private router: Router, private authService: AuthService) { }

//   // canActivate(
//   //   route: ActivatedRouteSnapshot,
//   //   state: RouterStateSnapshot): 
//   //   boolean{
//   //   // Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//   //     return true;

//   //   // if(this.auth.login()){
//   //   //   this.router.navigate(['/dashboard']);
//   //   //   return true;
//   //   // }
//   //   // else{
//   //   //   return false;
//   //   // }


//   //   //   let data = this.auth.login();
//   //   //   return false;

//   //   // if(this.auth.isLoggedIn()){
//   //   //     return true;
//   //   // }
//   //   // else{
//   //   //     this.router.navigate(['login']);
//   //   //     return false;
//   //   // }

//   //   // if (this.auth.login()) {
//   //   //     return true;
//   //   //   } else {
//   //   //     this.router.navigate(['/login']);
//   //   //     return false;
//   //   //   }

    

//   // }

// canActivate(): boolean {
//     // if ((this.authService.isLoggedIn()) && (!this.authService.checkAuthenticated()) ){
//       if (this.authService.isLoggedIn()){
//         this.router.navigate(['/dashboard']);
//         return false;
//     } else {
//         this.router.navigate(['/login']);
//         return true;
//     }

//   }
  
// }

// *************************************************************************

// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../service/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private router: Router, private authService: AuthService) { }

//   canActivate(): boolean {
//     if (this.authService.isLoggedIn() && this.authService.checkAuthenticated()) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }

// }

// ************************************************************************


// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../service/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private router: Router, private authService: AuthService) { }

//   canActivate(): boolean {
//     const authToken = localStorage.getItem('authToken');
//     if (this.authService.isLoggedIn() && authToken === 'true') {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }

// }

// 14-May 


// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../service/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private router: Router, private authService: AuthService) { }

//   canActivate(): boolean {
//     if (this.authService.isLoggedIn() ) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }

// }





// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../service/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router, private authService: AuthService) { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
//     if (this.authService.isLoggedIn() ) {
//       return true;
//     } else {
      
//       // Save the URL the user is trying to access
//       this.authService.redirectUrl = state.url;
      
//       // Check if the current route is the login page
//       if (state.url === '/login') {
//         // Redirect to the dashboard page instead of the login page
//         return this.router.parseUrl('/dashboard');
//       } else {
//         // Redirect to the login page
//         return this.router.parseUrl('/login');
//       }

//     }
//   }


// }
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isLoggedIn() ) {
      return true;
    } else {
      // Save the URL the user is trying to access
      localStorage.setItem('redirectUrl', state.url);
      this.router.navigate(['/login']);
      return false;
    }
  }
}