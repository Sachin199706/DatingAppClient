import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_Services/members.service';
import { Member } from '../../Models/member';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from "../member-card/member-card.component";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AccountService } from '../../_Services/account.service';
import { userParams } from '../../Models/userParams';
import { ICodeValue } from '../../Models/ICodeValue';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';


@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, MemberCardComponent,PaginationModule,FormsModule,ButtonsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  _memberService: MembersService = inject(MembersService);
  _toastrService: ToastrService = inject(ToastrService);


  genderList:ICodeValue[]=[{value:'All',display:'All'},{value:'male',display:'Males'},{value:'female',display:'Females'}];
  
  ngOnInit(): void {
    if (!this._memberService.paginatedResult()) {
      this.loadmembers();
    }

  }

  resetFilters(){
    this._memberService.setUserParams();
    this.loadmembers();
  }

  loadmembers() {
   const aobjParams:userParams=this._memberService.getUserParams();
   if(!aobjParams) return;
    this._memberService.getMembers(aobjParams);
  }

  pageChanged(event:any){
       const aobjParams:userParams=this._memberService.getUserParams();
   if(!aobjParams) return;

    if(aobjParams.pageNumber!==event.page){
      aobjParams.pageNumber=event.page;
      this.loadmembers();
    }
  }

}
  
