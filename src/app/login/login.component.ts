import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // If the user is already logged in, navigate to the dashboard page
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  title = "Login Page"
  loginBtn = "Login"

  username = '';
  password = '';
  usernameErrorMsg = '';
  passwordErrorMsg: string = '';
  showPassword: boolean = false;

  login(): void {
    this.loginBtn = "Loading...";
    this.authService.login(this.username, this.password).subscribe(result => {
      if (result) {
        this.usernameErrorMsg = '';
        this.passwordErrorMsg = '';
         // Navigate to the dashboard if login successful
        this.router.navigate(['/dashboard']);
      } else {
        // Display an error message if login unsuccessful
        (this.authService.loginErrorFieldName === 'username') ? this.usernameErrorMsg = "No user exists with this Username!" : this.passwordErrorMsg = "Incorrect password. Try Again!";
        this.loginBtn = "Login";
      }
    });
  }

  guestLoginBtn = "Guest Login"
  guestLogin(){
    this.guestLoginBtn = "Loading...";
    this.authService.login('rakhi', '12341234').subscribe(result => {
      if (result) {
        this.router.navigate(['/dashboard']);
      } 
    });

  }

  validatePassword() {
    if (this.password.length < 8) {
      this.passwordErrorMsg = 'Password must be at least 8 characters long';
    } else {
      this.passwordErrorMsg = '';
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


}
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
