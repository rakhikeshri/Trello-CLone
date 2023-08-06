import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-trello';
  isLoggedIn = false;

  // constructor() {
  //   const lastVisited = localStorage.getItem('lastVisited');
  //   if (lastVisited) {
  //     localStorage.removeItem('lastVisited');
  //     window.location.href = lastVisited;
  //   }
  // }
  constructor(private router: Router) {
    const redirectUrl = localStorage.getItem('redirectUrl');
    if (redirectUrl) {
      localStorage.removeItem('redirectUrl');
      this.router.navigateByUrl(redirectUrl);
    }
  }


}
