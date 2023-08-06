import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  url = 'https://users-board-data.onrender.com/users';
  constructor(private http: HttpClient) { }

  getUserData(){
    const userId = localStorage.getItem('userId');
    return this.http.get(`${this.url}/${userId}`);
  }

  getUserById(userId:number){
    return this.http.get(`${this.url}/${userId}`);
  }

  getAllUsers(){
    return this.http.get(this.url);
  }
  
  setUserData(data:any){
    const userId = localStorage.getItem('userId');
    return this.http.patch(`${this.url}/${userId}`,data);
  }
}
