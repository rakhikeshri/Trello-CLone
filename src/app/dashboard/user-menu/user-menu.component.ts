import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit{
  @Input() isMenuOpened: boolean = true;
  userName:string = '';
  userEmail:string = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || 'User';
    this.userEmail = localStorage.getItem('userEmail') || 'user@gmail.com';
  }

  onLogout(): void {
    this.authService.logout();
  }
  
  handleClick(){
    this.router.navigate([`/dashboard/user-profile`]);
    this.isMenuOpened = false;
  }
}
