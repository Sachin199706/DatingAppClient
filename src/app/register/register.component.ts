import { Component, inject, OnInit, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_Services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from "../_forms/date-picker/date-picker.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent, DatePickerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  // model: any = {};
  cancelRegister = output<boolean>();
  _accountService: AccountService = inject(AccountService);
  _fb=inject(FormBuilder);
  _router: Router = inject(Router);
  _toaster: ToastrService = inject(ToastrService);
  registerForm: FormGroup = new FormGroup({});
  maxDate=new Date();
  validationErrors:string[]|undefined;

  // old code
  //constructor (private accountService: AccountService) {} 
  //@Output() cancelRegister = new EventEmitter();

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }

  initializeForm() {
    this.registerForm =this._fb.group (
      {
        username: ['', Validators.required],
        email:['',[Validators.required,Validators.email]],
        gender:['male'],
        knownAs:['',Validators.required],
        dateOfBirth:['',Validators.required],
        city:['',Validators.required],
        country:['',Validators.required],

        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
        confirmPassword: ['', [Validators.required, this.matchValue('password')]]
      }
    );
    // when password changes, re-validate confirmPassword
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: _ => {
        this.registerForm.controls['confirmPassword']
          .updateValueAndValidity();
      }
    });

  }
  matchValue(value: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.parent) return null;
      return control.value === control.parent.get(value)?.value ? null : { isMatching: true };
    }
  }

  register() {
    const dob=this.getDateOnly(this.registerForm.get('dateOfBirth')?.value);
    this.registerForm.patchValue({dateOfBirth:dob});
    this._accountService.register(this.registerForm.value).subscribe({
      next: _ => {
        this._toaster.success('Registration successful');
        this._router.navigateByUrl('/members');
       // this.Cancel();
      },
      error: (error) => {
        this.validationErrors=error;

      }
    });

  }
  Cancel() {
    //  this.model = {};
    this.cancelRegister.emit(false);
  }

  private getDateOnly(dob:string|undefined){
      if(!dob) return;
      return new Date(dob).toISOString().slice(0,10);
  }
}
