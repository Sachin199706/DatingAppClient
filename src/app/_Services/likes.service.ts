import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Member } from '../Models/member';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../Models/Pagnation';
import { userParams } from '../Models/userParams';
import { PaginationHelper } from './PaginationHelper';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
baseUrl=environment.apiUrl;
_http:HttpClient=inject(HttpClient);
likeIds=signal<number[]>([]);
paginatedResult=signal<PaginatedResult<Member[]> |null>(null);
  constructor() { }

  toggleLike(targetId:number):Observable<void>{
    return this._http.post<void>(`${this.baseUrl}likes/${targetId}`,{});
  }
  getLikes(predicate:string,pageNumber:number,pageSize:number){
    let param:userParams=new userParams(null);
    param.pageNumber=pageNumber;
    param.pageSize=pageSize;

    let params=PaginationHelper.setPaginationHeader(param);
    params=params.append('predicate',predicate);

    return this._http.get<Member[]>(`${this.baseUrl}likes`,{ observe: 'response',params}).subscribe({
      next:(res:any)=>{
        PaginationHelper.setPaginatiedResponse(res,this.paginatedResult);      
      }
    });

    
  }
  getLikeIds(){
    return this._http.get<number[]>(`${this.baseUrl}likes/list`).subscribe({
      next:(ids:number[])=>{
        this.likeIds.set(ids);
      }
    })
  }


}
