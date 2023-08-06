import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ClickOutsideDirective } from './clickOutside.directive';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    UserMenuComponent,
    UserProfileComponent,
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  
})


export class DashboardModule { }
