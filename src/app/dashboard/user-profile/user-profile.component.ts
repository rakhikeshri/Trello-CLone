import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  @ViewChild('myForm') myForm!: NgForm;

  constructor(private userProfile:UserProfileService){}

  ngOnInit(): void {
    this.userProfile.getUserData().subscribe((res:any)=>{
      if(res){
        this.user.username = res.username;
        this.user.password = res.password;
        this.user.name = res.name;
        this.user.email = res.email;
        this.user.phone = res.phone;
        if(res.address){
          this.user.address.base = res.address.base;
          this.user.address.landmark = res.address.landmark;
          this.user.address.city = res.address.city;
          this.user.address.state = res.address.state;
          this.user.address.country = res.address.country;
        }
      }
    });
  }

  user = {
    username: '',
    password:'',
    name: '',
    email: '',
    phone: '',
    address: {
      base: '',
      landmark: '',
      city: '',
      state: '',
      country: ''
    }
  };

  editedFields: string[] = [];

  onChange(fieldName:string){
    if (!this.editedFields.includes(fieldName)) {
      this.editedFields.push(fieldName);
    }
  }

  submitForm() {
    if (this.myForm.valid && this.editedFields.length !== 0) {
      this.userProfile.setUserData(this.user).subscribe((res)=>{
        if(res){
          alert("Profile data updated successfully!");
        }else{
          alert("Couldn't save updates!");
        }
      })
    }
  }

  goBack() {
    window.history.back();
  }
  
}


