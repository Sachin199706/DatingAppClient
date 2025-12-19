import { Component, EventEmitter, inject, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../_Services/account.service';
import { IUser } from '../Models/User';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
model: any = {};
cancelRegister=output<boolean>();
_accountService: AccountService=inject(AccountService);

// old code
//constructor (private accountService: AccountService) {} 
//@Output() cancelRegister = new EventEmitter();

  register() {
      this._accountService.register(this.model).subscribe({
        next:(user:IUser)=>{
          console.log('Registration successful:', user);
          this.Cancel();
        },
        error:(error)=>{
          console.error('Registration failed:', error);
        }
      });


    console.log('User registered:', this.model);
  }
  Cancel(){
    this.model = {};
    this.cancelRegister.emit(false);
  }
}
