import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BoardsService } from '.././../../service/boards.service'
import { UserProfileService } from 'src/app/service/user-profile.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  constructor(private router: Router, private boards: BoardsService, private userProfile:UserProfileService, private builder: FormBuilder) { }

  @ViewChild('inputCharError', { static: false }) inputCharError!: ElementRef;
  @ViewChild('inputCharErrorDesc', { static: false }) inputCharErrorDesc!: ElementRef;

  userId = Number(localStorage.getItem('userId'));
  hoveredBoard = -1;

  cardCreationTitle = 'Create New Board'
  totalSize = 5

  showCardHead() {
    // if(this.boardsArray.length === 0){
    //   this.cardCreationTitle = 'Create New Board'
    // }else if(this.boardsArray.length > 0 && this.boardsArray.length < this.totalSize){
    //   this.cardCreationTitle = 'Remaining ' + (this.totalSize - this.boardsArray.length) 
    // }else{
    //   this.cardCreationTitle = 'Cannot create more than ' + this.totalSize + 'cards'
    // }
  }

  addBoards = this.builder.group({
    title: this.builder.control(''),
    description: this.builder.control('')
  })

  boardsData: any;
  recentBoards:number[] = [];
  numberOfStarredBoards = 0;

  ngOnInit(): void {
    this.boards.getAllBoards().subscribe((allBoards: any) => {
      this.boardsData = allBoards.filter((board:any) => {
        if(board.starredByUserId.includes(this.userId)) ++this.numberOfStarredBoards;
        return board.users.includes(this.userId)
      });
      this.boards.boardCount$.next(this.boardsData.length);
      this.boards.boardData$.next(this.boardsData);
    })

    this.userProfile.getUserData().subscribe((res:any)=>{
      if(res){
        this.recentBoards = res.recentBoards;
      }
    })
  }

  updateRecentBoardsInDB(){
    const data = {
      recentBoards:this.recentBoards
    }
    this.userProfile.setUserData(data).subscribe((res)=>{
      if(res){
        console.log("Recent boards updated in DB!");
      }
    })
  }

  saveBoards() {
    const formData:any = this.addBoards.value;
    formData['users'] = [this.userId];
    formData['starredByUserId'] = [];
    formData['admins'] = [this.userId];
    formData['editors'] = [];
    formData['viewers'] = [];

    console.log(formData.description.length)

    if(formData.title.length < 20){
      this.boards.saveBoardsData(formData).subscribe((result) => {
        this.boardsData.push(result);
        this.boards.boardCount$.next(this.boardsData.length);
        this.boards.boardData$.next(this.boardsData);
        this.addBoards.reset({})
      })
    }else{
      alert('Keep the title short (20 characters max).')
    }
  }

  starThisBoard(boardId:number, event:Event){
    this.boardsData.forEach((board:any) => {
      if(board.id === boardId){
        board.starredByUserId.push(this.userId);
        ++this.numberOfStarredBoards;
        this.boards.updateStarredByUsers(boardId,{starredByUserId:board.starredByUserId}).subscribe((res)=>{
          if(res){
            console.log(`Marked ${boardId} as starred in DB by user ${this.userId}!`);
          }
        })
      }
    });
    event.stopPropagation();
  }

  unstarThisBoard(boardId:number, event:Event){
    this.boardsData.forEach((board:any) => {
      if(board.id === boardId){
        const idxToBeRemoved = board.starredByUserId.indexOf(this.userId);
        if(idxToBeRemoved !== -1){
          board.starredByUserId.splice(idxToBeRemoved, 1);
          this.hoveredBoard = -1;
          --this.numberOfStarredBoards;
          this.boards.updateStarredByUsers(boardId,{starredByUserId:board.starredByUserId}).subscribe((res)=>{
            if(res){
              console.log(`Marked ${boardId} as *unstarred* in DB by user ${this.userId}!`);
            }
          })
        }
      }
    });
    event.stopPropagation();
  }

  handleClick(board_id: number){
    if(this.recentBoards.includes(board_id)){
      const idx = this.recentBoards.indexOf(board_id);
      this.recentBoards.splice(idx,1);
    }
    if(this.recentBoards.length == 4) this.recentBoards.pop();
    this.recentBoards.unshift(board_id);
    this.updateRecentBoardsInDB();
    this.router.navigate([`dashboard/board/board-new/${board_id}`]);
  }

  title:String = ''
  validateTitle(){
    if(this.title.length > 20){
      this.inputCharError.nativeElement.style.display = 'block'
    }else{
      this.inputCharError.nativeElement.style.display = 'none'
    }
  }

  description:String = ''
  validateDescription(){
    if(this.description.length > 80){
      this.inputCharErrorDesc.nativeElement.style.display = 'block'
    }else{
      this.inputCharErrorDesc.nativeElement.style.display = 'none'
    }
  }
}
