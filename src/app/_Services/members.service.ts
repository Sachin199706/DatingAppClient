import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, of, tap } from 'rxjs';
import { Member, MemberUpdate, Photo } from '../Models/member';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './account.service';
import { PaginatedResult } from '../Models/Pagnation';
import { userParams } from '../Models/userParams';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
 private _httpclient: HttpClient = inject(HttpClient);
 private _accountService:AccountService=inject(AccountService); 
 private _toastrService: ToastrService = inject(ToastrService);
  BaseUrl: string = environment.apiUrl;
  //members = signal<Member[]>([]);
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);
 userParams:userParams =new userParams(this._accountService.currentUser());

  memberCache = new Map();

  //old code
  //constructor(private httpclient: HttpClient) { }

  getMembers(userParams: userParams): void {

    const response = this.memberCache.get(Object.values(userParams).join('-'));
    if(response) return this.setPaginatiedResponse(response);
    let params = this.setPaginationHeader(userParams);

    this._httpclient.get<Member[]>(this.BaseUrl + 'users', { observe: 'response', params }).subscribe({
      next: (res: HttpResponse<Member[]>) => {
       this.setPaginatiedResponse(res);
       this.memberCache.set(Object.values(userParams).join('-'),res);
        this._toastrService.success("Members loaded successfully", "Success");
      }
    });
  }

private setPaginatiedResponse(res:HttpResponse<Member[]>){
 this.paginatedResult.set({
          items: res.body as Member[],
          Pagination: JSON.parse(res.headers.get('Pagination')!)
        })
}

  private setPaginationHeader(userParams: userParams): HttpParams {
    let params = new HttpParams();

    params = params.appendAll({
      'pageNumber': userParams.pageNumber,
      'pageSize': userParams.pageSize,
      'minAge': userParams.minAge,
      'maxAge': userParams.maxAge,
      'gender': userParams.gender,
      'orderBy': userParams.OrderBy

    });
    return params;


  }


  getMember(username: string): Observable<Member> {
    // let member = this.members().find(m => m.username === username);
    // if (member) return of(member);

      const member:Member=[...this.memberCache.values()].reduce((arr,elem)=>arr.concat(elem.body),[]).find((m:Member)=>m.username===username);
      if(member) return of(member);

    return this._httpclient.get<Member>(`${this.BaseUrl}users/${username}`);
  }

  UPdateMember(member: Member): Observable<void> {
    return this._httpclient.put<void>(`${this.BaseUrl}users`, member).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m => m.username === member.username ? member : m));
      // }
      // )
    );
  }

  setMainPhoto(photo: Photo): Observable<void> {
    return this._httpclient.put<void>(`${this.BaseUrl}users/set-main-photo/${photo.id}`, {}).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m => {
      //     if (m.photos.includes(photo)) {
      //       m.photoUrl = photo.url;
      //     }
      //     return m;
      //   }));
      // })
    );
  }

  deletePhoto(photo: Photo): Observable<void> {
    return this._httpclient.delete<void>(`${this.BaseUrl}users/delete-photo/${photo.id}`).pipe(
      // tap(()=>{
      //   this.members.update(mems=>mems.map(m=>{
      //     if(m.photos.includes(photo)){
      //       m.photos=m.photos.filter(x=>x.id !==photo.id);
      //     }
      //     return m;
      //   }))
      // })
    );
  }

  getUserParams():userParams{
    return this.userParams;
  }

  setUserParams():userParams{
    this.userParams=new userParams(this._accountService.currentUser());
    return this.userParams;
  }
}
