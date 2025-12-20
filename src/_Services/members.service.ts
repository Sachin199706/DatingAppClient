import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Member } from '../app/Models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  _httpclient: HttpClient = inject(HttpClient);
  BaseUrl: string = environment.apiUrl;

  //old code
  //constructor(private httpclient: HttpClient) { }

  getMembers():Observable<Member[]> {
    return this._httpclient.get<Member[]>(this.BaseUrl + 'users');
  }
  getMember(username:string):Observable<Member> {
    return this._httpclient.get<Member>(`${this.BaseUrl}users/${username}`);
  }
}
