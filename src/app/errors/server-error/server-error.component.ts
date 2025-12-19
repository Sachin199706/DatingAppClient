import { Component, inject } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css'
})
export class ServerErrorComponent {
 error:any;
 _route: Router=inject(Router);
 constructor(){
    const navigation= this._route.getCurrentNavigation();
    this.error=navigation?.extras?.state?.['error'];
 }
 
}
