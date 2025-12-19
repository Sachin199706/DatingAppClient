import { Component, EventEmitter, inject, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../_Services/account.service';
import { IUser } from '../Models/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: any = {};
  cancelRegister = output<boolean>();
  _accountService: AccountService = inject(AccountService);
  _router: Router = inject(Router);
  _toaster: ToastrService = inject(ToastrService);

  // old code
  //constructor (private accountService: AccountService) {} 
  //@Output() cancelRegister = new EventEmitter();

  register() {
    this._accountService.register(this.model).subscribe({
      next: _ => {
        this._toaster.success('Registration successful');
        this._router.navigateByUrl('/members');
        this.Cancel();
      },
      error: (error) => {
        this._toaster.error('Registration failed:', error);
      }
    });

  }
  Cancel() {
    this.model = {};
    this.cancelRegister.emit(false);
  }
}
