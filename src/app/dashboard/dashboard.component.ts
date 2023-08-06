import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.location.replaceState('/dashboard');
    localStorage.setItem('lastVisited', '/dashboard'); // store the last visited URL in localStorage
  }
}
