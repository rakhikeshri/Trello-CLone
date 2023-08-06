import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  url = 'https://users-board-data.onrender.com/users';
  constructor(private http: HttpClient) { }

  getUserData(){
    const userId = localStorage.getItem('userId');
    return this.http.get(`${this.url}/${userId}`);
  }
  
  setUserData(data:any){
    return this.http.post(this.url, data)

  }

  setItem(data:any){
    return this.http.post(this.url, data)
  }

}
