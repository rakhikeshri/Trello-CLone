import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  
  toggle_Sidebar:boolean = false

  toggleSidebar(){
    this.toggle_Sidebar = !this.toggle_Sidebar
  }

}
