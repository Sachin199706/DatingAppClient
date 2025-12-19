import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../_Services/account.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { IUser } from '../Models/User';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, CommonModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  creds: any = {};

  constructor(public accountService: AccountService) { }

  // Trigger login process
  login() {

    // Call login service and subscribe to the response
    this.accountService.login(this.creds).subscribe({

      // Executed when login is successful
      next: (response: IUser) => {
 
        // Log successful login response
        console.log('Login successful', response);
      },

      // Executed when login fails
      error: error => {

        // Log login error
        console.error('Login failed', error);
      }
    });
  }

  // Trigger logout process
  logout() {


    // Call logout service (clear user/session)
    this.accountService.logout();
  }

}
