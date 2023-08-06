import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndividualBoardComponent } from './individual-board/individual-board.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardComponent } from './board.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { ClickOutsideDirective } from './clickOutside.directive';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    IndividualBoardComponent,
    BoardComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    HttpClientModule,
    DragDropModule
  ],
})
export class BoardModule { }
