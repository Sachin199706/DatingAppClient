import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../../_Services/members.service';
import { Member } from '../../Models/member';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  _memberService:MembersService=inject(MembersService);
  _toastrService:ToastrService=inject(ToastrService);
iarrMembers:Member[]=[];
  ngOnInit(): void {
    this.loadmembers();

  }

  loadmembers(){
    this._memberService.getMembers().subscribe({
      next:(response:Member[])=>{
        this.iarrMembers=response;
        this._toastrService.success("Members loaded successfully","Success");
      }
      
    })
  }
}