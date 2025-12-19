import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../_Services/account.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, CommonModule, BsDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  creds: any = {};
 _accountService: AccountService=inject(AccountService);
 _router: Router=inject(Router);
 _toastr: ToastrService=inject(ToastrService);
  //old code
 // constructor(public accountService: AccountService,private router:Router) { }

  // Trigger login process
  login() {

    // Call login service and subscribe to the response
    this._accountService.login(this.creds).subscribe({

      // Executed when login is successful
      next: _ => {
 
        // Log successful login response
        this._toastr.success('Login successful');
        // Navigate to members area
       void this._router.navigateByUrl('/members');
      },

      // Executed when login fails
      error: error => {

        // Log login error
       this._toastr.error('Login failed', error.error);
      }
    });
  }

  // Trigger logout process
  logout() {


    // Call logout service (clear user/session)
    this._accountService.logout();
    this._toastr.info('Logged out');
    // Navigate to home page
   void this._router.navigateByUrl('/');
  }

}
