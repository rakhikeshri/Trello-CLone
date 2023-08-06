import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardsService } from 'src/app/service/boards.service';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit{
  boardId:number = -1;
  users:any = [];
  boardTitle:string = "";
  boardData:any = {};
  userId = Number(localStorage.getItem('userId'));

  constructor(private route: ActivatedRoute, public board:BoardsService, public userProfile:UserProfileService){}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.boardId = params['boardId'];

      this.users = [];
      this.board.getBoardById(this.boardId).subscribe((res:any)=>{
        if(res){ 
          this.boardData = res;
          console.log(res);
          this.boardTitle = res.title;
          res.users.forEach((userId:number)=>{
            this.userProfile.getUserById(userId).subscribe((res)=>{
              if(res) this.users.push(res);
            })
          });
        }
      })
    });
  }

  removeMemberFromBoard(userId:number){
    this.users = this.users.filter((user:any)=>{
      return user.id !== userId;
    })

    this.boardData.users = this.boardData.users.filter((user:any)=>{
      return user !== userId;
    })

    this.boardData.admins = this.boardData.admins.filter((user:any)=>{
      return user !== userId;
    })

    this.boardData.editors = this.boardData.editors.filter((user:any)=>{
      return user !== userId;
    })

    this.boardData.viewers = this.boardData.viewers.filter((user:any)=>{
      return user !== userId;
    })

    console.log(this.boardData);
    this.board.updateBoardById(this.boardId, this.boardData).subscribe((res)=>{
      if(res){
        console.log("Removed user from board successfully!");
      }
    })
  }

}
