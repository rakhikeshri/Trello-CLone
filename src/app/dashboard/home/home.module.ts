import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { BoardsComponent } from './boards/boards.component';
import { HighlightsComponent } from './highlights/highlights.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MembersComponent } from './members/members.component';
// import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    BoardsComponent,
    HighlightsComponent,
    MembersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
