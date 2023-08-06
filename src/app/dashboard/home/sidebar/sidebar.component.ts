import { Component, OnInit } from '@angular/core';
import { BoardsService } from '.././../../service/boards.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{
  constructor(private boards: BoardsService) { }
  boardCount$ = this.boards.boardCount$;
  boardsData$ = this.boards.boardData$;
  
  // boardsData: any;
  // userId = Number(localStorage.getItem('userId'));

  // ngOnInit(): void {
  //   this.boards.getAllBoards().subscribe((allBoards: any) => {
  //     this.boardsData = allBoards.filter((board:any) => {
  //       return board.users.includes(this.userId)
  //     });
  //   })
  // }
}
