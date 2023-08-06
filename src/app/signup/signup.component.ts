import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { SignupService } from '../service/signup.service';
import { BoardsService } from '../service/boards.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  title = 'Sign Up Page';
  errorMsg = '';
  users: any[] = [];

  @ViewChild('myForm') myForm!: NgForm;

  constructor(
    private signupForm: SignupService,
    private router: Router,
    private boards: BoardsService
  ) {}
  user = {
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    recentBoards: [],
  };

  ngOnInit(): void {
    this.boards.getAllUsers().subscribe((res: any) => {
      this.users = res.map((user:any)=> user.username);
      console.log(this.users);
    });
  }

  editedFields: string[] = [];

  onChange(fieldName: string) {
    if (!this.editedFields.includes(fieldName)) {
      this.editedFields.push(fieldName);
    }
  }
  submitForm() {
    if (this.user.name === this.user.username) {
      alert('Name and Username should not be same');
      this.errorMsg = 'Name and Username should not be same';
    }else if(this.users.includes(this.user.username)){
      alert('The user already exist.')
    }else if((this.user.phone).toString().length !== 10){
      alert('Invalid Phone No.')
    }
    else {
      if (this.myForm.valid && this.editedFields.length !== 0) {
        this.signupForm.setUserData(this.user).subscribe((res) => {
          if (res) {
            alert('Profile created successfully!');
            localStorage.setItem('signupForm', JSON.stringify(this.signupForm));
            this.user = {
              name: '',
              username: '',
              email: '',
              phone: '',
              password: '',
              recentBoards: [],
            };
            
            this.router.navigate(['login']);
          } else {
            alert("Couldn't save updates!");
          }
        });
      }
    }
  }
}
