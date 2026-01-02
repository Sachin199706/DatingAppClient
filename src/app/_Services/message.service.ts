import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './account.service';
import { PaginatedResult } from '../Models/Pagnation';
import { Message } from '../Models/Message';
import { userParams } from '../Models/userParams';
import { PaginationHelper } from './PaginationHelper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = environment.apiUrl;
  private _http = inject(HttpClient);
  private _accountService = inject(AccountService);
  paginatedResult = signal<PaginatedResult<Message[]> | null>(null);


  constructor() { }

  getMessage(pageNumber: number, pageSize: number, container: string) {
    let param: userParams = new userParams(null);
    param.pageNumber = pageNumber;
    param.pageSize = pageSize;

    let params = PaginationHelper.setPaginationHeader(param);
    params = params.append('container', container);
    return this._http.get<Message[]>(`${this.baseUrl}messages`, { observe: 'response', params }).subscribe({
      next: (res) => { PaginationHelper.setPaginatiedResponse(res, this.paginatedResult) }
    })
  }
getMessageThread(username:string):Observable<Message[]>{
  return this._http.get<Message[]>(this.baseUrl+'messages/thread/'+username);
}

sendMessage(username:string,content:string):Observable<Message>{
return this._http.post<Message>(this.baseUrl+'messages',{recipientUserName:username,content});
}

deleteMessage(id:number){
return this._http.delete(this.baseUrl+'messages/'+id);
}

}
