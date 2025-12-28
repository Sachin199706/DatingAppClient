import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUser } from '../Models/User';
import { environment } from '../../environments/environment.development';
import { LikesService } from './likes.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  currentUser = signal<IUser | null>(null);
  BaseUrl = environment.apiUrl;

  constructor(private httpclient: HttpClient,private _likesServices:LikesService) { }

  // Login API call
  public login(data: any): Observable<IUser> {

    // Send POST request to login API
    return this.httpclient
      .post<IUser>(`${this.BaseUrl}account/login`, data)
      .pipe(

        // map() is used to perform side effects and return user
        map((user: IUser) => {

          // Set current user
          this.setCurrentUser(user);

          // Return user to subscriber
          return user;
        })
      );
  }

  // register API call
  public register(data: any): Observable<IUser> {

    // Send POST request to register API
    return this.httpclient
      .post<IUser>(`${this.BaseUrl}account/register`, data)
      .pipe(

        // map() is used to perform side effects and return user
        map((user: IUser) => {

          // Set current user
          this.setCurrentUser(user);

          // Return user to subscriber
          return user;
        })
      );
  }

  public logout(): void {
    // Remove user from localStorage
    localStorage.removeItem('user');
    // Reset currentUser signal
    this.currentUser.set(null);
    
  }

  public loadCurrentUser(): void {
    const userJson = localStorage.getItem('user');
    if (!userJson) return;
    const user: IUser = JSON.parse(userJson);
    this.currentUser.set(user);
  }



  public setCurrentUser(user: IUser | null): void {
    // Store user in localStorage (persist login)
    localStorage.setItem('user', JSON.stringify(user));

    // Update currentUser signal
    this.currentUser.set(user);

    this._likesServices.getLikeIds();

  }
  public getToken(): string | null {
    const user = this.currentUser();
    return user ? user.token : null;
  }
}
