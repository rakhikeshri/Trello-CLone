import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { BoardsComponent } from './dashboard/home/boards/boards.component';
import { HighlightsComponent } from './dashboard/home/highlights/highlights.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { BoardComponent } from './dashboard/baord/board.component';
import { IndividualBoardComponent } from './dashboard/baord/individual-board/individual-board.component';
import { UserProfileComponent } from './dashboard/user-profile/user-profile.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './dashboard/home/members/members.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // { 
  //   path: 'admin', 
  //   // canActivate: [AuthGuard],
  //   loadChildren: () => 
  //   import('./modules/admin/admin.module').then((m)=> m.AdminModule) 
  // },

  // { path: 'dashboard', redirectTo: '/dashboard/home/boards', pathMatch: 'full'},
  {
    path: 'dashboard',
    canActivate:[AuthGuard], 
    component: DashboardComponent, 
    children: [
      { path: '', redirectTo: '/dashboard/home/boards', pathMatch: 'full'},
      { path:'user-profile', component:UserProfileComponent, pathMatch:'full' },
      // { path:'right-sidebar', component:RightSidebarComponent, pathMatch:'full' },
      { path: 'home', component: HomeComponent, children: [
        { path: '', redirectTo: '/dashboard/home/boards', pathMatch: 'full'},
        { path:'boards', component: BoardsComponent },
        { path:'highlights', component: HighlightsComponent },
        { path:'members/:boardId', component: MembersComponent },
      ] },

      {
        path: 'board', component: BoardComponent, children: [
          { path: 'board-new/:id', component: IndividualBoardComponent },
        ]
      },

    ]
  },
  { path: '**', component: NotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
