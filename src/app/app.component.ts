import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from '../_Services/account.service';
import { NgxSpinnerComponent } from "ngx-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'DatingAppClient';
  accountService = inject(AccountService);


 // Angular lifecycle hook – runs once when the component is initialized
ngOnInit(): void {

  // Restore logged-in user from localStorage (if available)
  this.setCurrentUser();
}

// Reads user data from localStorage and sets it in the account service
setCurrentUser() {

  // Get stored user string from localStorage
  const userString = localStorage.getItem('user');

  // If no user is found, exit the method
  if (!userString) return;

  // Convert JSON string back to user object
  const user = JSON.parse(userString);

  // Update currentUser signal in account service
  this.accountService.currentUser.set(user);
}

}
