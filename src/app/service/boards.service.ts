import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  url = 'https://users-board-data.onrender.com/boards';
  user_url = 'https://users-board-data.onrender.com/users';
  list_url = 'https://users-board-data.onrender.com/lists';
  card_url = 'https://users-board-data.onrender.com/cardsItem';
  checklist_url = 'https://users-board-data.onrender.com/checklists';
  boardCount$ = new BehaviorSubject<number>(0);
  boardData$ = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.user_url)
  }

  getUserById(userId: number) {
    return this.http.get(`${this.user_url}/${userId}`);
  }

  saveBoardsData(data: any) {
    return this.http.post(this.url, data);
  }
  getAllBoards() {
    return this.http.get(this.url);
  }

  getBoardById(boardId: number) {
    return this.http.get(`${this.url}/${boardId}`);
  }

  updateBoardById(boardId:number, data:any){
    return this.http.put(`${this.url}/${boardId}`, data);
  }

  updateUsers(boardId:number, data:any){
    return this.http.patch(`${this.url}/${boardId}`, data);
  }
  
  updateUserAccessType(boardId:number, data:any){
    return this.http.patch(`${this.url}/${boardId}`, data);
  }

  updateStarredByUsers(boardId: number, data: any) {
    return this.http.patch(`${this.url}/${boardId}`, data);
  }

  updateListTitle(listId: number, data: any) {
    return this.http.patch(`${this.list_url}/${listId}`, data);
  }
  
  saveListsData(data: any) {
    return this.http.post(this.list_url, data);
  }
  getAllLists() {
    return this.http.get(this.list_url);
  }
  
  saveCardsItemData(data: any) {
    return this.http.post(this.card_url, data);
  }
  
  updateCardTitle(cardId: number, data: any) {
    return this.http.patch(`${this.card_url}/${cardId}`, data);
  }

  getAllCardsItem() {
    return this.http.get(this.card_url);
  }

  addCardDescByCardId(card_id: number, data: any) {
    return this.http.patch(`${this.card_url}/${card_id}`, data);
  }

  addCardComment(card_id: number, data: any) {
    return this.http.patch(`${this.card_url}/${card_id}`, data);
  }

  saveChecklistsData(data: any) {
    return this.http.post(this.checklist_url, data);
  }

  getChecklistById(checklist_id: number) {
    return this.http.get(`${this.checklist_url}/${checklist_id}`);
  }

  getAllChecklists() {
    return this.http.get(this.checklist_url);
  }

  toggleChecklist(checklist_id: number, data: any) {
    return this.http.patch(`${this.checklist_url}/${checklist_id}`, data);
  }



  // getBoardById(id: number) {
  //   return this.http.get(`${this.url}/${id}`)
  // }

  // updateBoardById(id: number, data: any) {
  //   return this.http.put(`${this.url}/${id}`, data)
  // }

  // getListsById(id: number) {
  //   return this.http.get(`${this.list_url}/${id}`)
  // }


  // DELETE CARD (list-item) 
  deleteCard( id: any){
    return this.http.delete(`${this.card_url}/${id}`);
  }
}
