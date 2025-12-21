import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable, of, tap } from 'rxjs';
import { Member, MemberUpdate, Photo } from '../app/Models/member';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  _httpclient: HttpClient = inject(HttpClient);
  _toastrService: ToastrService = inject(ToastrService);
  BaseUrl: string = environment.apiUrl;
  members = signal<Member[]>([]);

  //old code
  //constructor(private httpclient: HttpClient) { }

  getMembers(): void {
    this._httpclient.get<Member[]>(this.BaseUrl + 'users').subscribe({
      next: (res: Member[]) => {
        this.members.set(res);
        this._toastrService.success("Members loaded successfully", "Success");
      }
    });
  }
  getMember(username: string): Observable<Member> {
    let member = this.members().find(m => m.username === username);
    if (member) return of(member);
    return this._httpclient.get<Member>(`${this.BaseUrl}users/${username}`);
  }

  UPdateMember(member: Member): Observable<void> {
    return this._httpclient.put<void>(`${this.BaseUrl}users`, member).pipe(
      tap(() => {
        this.members.update(members => members.map(m => m.username === member.username ? member : m));
      }
      )
    );
  }

  setMainPhoto(photo: Photo): Observable<void> {
    return this._httpclient.put<void>(`${this.BaseUrl}users/set-main-photo/${photo.id}`, {}).pipe(
      tap(() => {
        this.members.update(members => members.map(m => {
          if (m.photos.includes(photo)) {
            m.photoUrl = photo.url;
          }
          return m;
        }));
      })
    );
  }

  deletePhoto(photo: Photo): Observable<void> {
    return this._httpclient.delete<void>(`${this.BaseUrl}users/delete-photo/${photo.id}`).pipe(
      tap(()=>{
        this.members.update(mems=>mems.map(m=>{
          if(m.photos.includes(photo)){
            m.photos=m.photos.filter(x=>x.id !==photo.id);
          }
          return m;
        }))
      })
    );
  }
}
