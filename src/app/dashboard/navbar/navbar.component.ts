import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { BoardsService } from 'src/app/service/boards.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  constructor(
    private authService: AuthService,
    private boards: BoardsService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  userId = Number(localStorage.getItem('userId'));
  boardsData: any;
  @ViewChild('searchInput', { static: false }) myInputRef!: ElementRef;

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || 'User';
    this.renderer.listen('window', 'click', (event: Event) => {
      this.boardName = ''
      if(this.boardName.length === 0) this.filteredBoard = []
      this.myInputRef.nativeElement.value = ''
    });
  }

  
  boardName: string = '';
  filteredBoard: any[] = [];
  
  searchBoard(e: any) {
    this.boards.getAllBoards().subscribe((allBoards: any) => {
      this.boardsData = allBoards.filter((board: any) => {
        return board.users.includes(this.userId);
      });
    });
    this.boardName = e.target.value.toLowerCase();
    this.filteredBoard = this.boardsData.filter((board: any) =>
      board.title.toLowerCase().includes(this.boardName)
    );
    // console.log('filtered board', this.filteredBoard);

    if (this.filteredBoard.length === 0) {
      // Perform a fuzzy search if no exact matches found
      this.filteredBoard = this.boardsData.filter((board: any) =>
        this.fuzzySearch(board.title.toLowerCase(), this.boardName)
      );
    }

    if(this.boardName.length === 0) this.filteredBoard = []
  }

  fuzzySearch(str: string, query: string): boolean {
    const strLength = str.length;
    const queryLength = query.length;

    if (queryLength > strLength) {
      return false;
    }

    if (queryLength === strLength) {
      return str === query;
    }

    return false;
  }

  navigate_searched_board(board_id: number, searchInput:any){
    this.router.navigate([`dashboard/board/board-new/${board_id}`]);
    searchInput.value = ''
    this.filteredBoard = []
  }

  alert_click(board_id: number){
    alert(board_id)
  }

  onLogout(): void {
    this.authService.logout();
  }

  isMenuOpened :boolean = false
  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened
  }

  clickedOutside(){
    this.isMenuOpened = false
  }





  // menuElements = document.getElementsByClassName('menu').addEventListener('click', e => e.stopPropagation())

  
}
