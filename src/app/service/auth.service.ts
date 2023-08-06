import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = false;

  // ********************* LOCAL DB *****************
  // url = 'http://localhost:3000/users';
  loginErrorFieldName = '';
  // ********************* DEPLOYED *****************
  url = 'https://users-board-data.onrender.com/users';

  constructor(private router: Router, private http : HttpClient) {
    this._isLoggedIn = !!localStorage.getItem('authToken'); // Check if authentication token is present in LocalStorage
  }

  login(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.getUsers().subscribe((users: any) => { 
        let user = users.filter((u: any) => u.username === username );
        
        if (user.length > 0) {
          user = user.filter((u: any) => u.password === password);
          if(user.length > 0){
            user = user[0];
            localStorage.setItem('userId',user.id);
            localStorage.setItem('userName',user.name);
            localStorage.setItem('userEmail',user.email);
            this._isLoggedIn = true;
            localStorage.setItem('authToken', 'some-authentication-token'); // Store the authentication token in LocalStorage
            this.router.navigate(['/dashboard']);
            this.loginErrorFieldName = '';
            observer.next(true);
            observer.complete();
          }else{
            this.loginErrorFieldName = "password";
            observer.next(false);
            observer.complete();
          }
        } else {
          this.loginErrorFieldName = "username";
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
  getUsers(){
    return this.http.get(this.url);
  }

  logout(): void {
    this._isLoggedIn = false;
    localStorage.removeItem('authToken'); // Remove the authentication token from LocalStorage
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
}
