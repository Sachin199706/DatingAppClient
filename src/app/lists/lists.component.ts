import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LikesService } from '../_Services/likes.service';
import { Member } from '../Models/member';
import { ButtonRadioDirective } from "ngx-bootstrap/buttons";
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from "../members/member-card/member-card.component";
import { NgClass } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [ButtonRadioDirective, FormsModule, MemberCardComponent,PaginationModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit,OnDestroy  {
   _likesServices: LikesService = inject(LikesService);
  predicate = 'liked';
  pageNumber:number=1;
  pageSize:number=5;

  ngOnInit(): void {
    this.loadlikes();
  }

  getTitle(){
    switch(this.predicate){
        case 'liked': return 'Members you like';
        case 'likedBy': return 'Members how like you';
        default : return 'Mutual';
    }
  }

  loadlikes(){
    this._likesServices.getLikes(this.predicate,this.pageNumber,this.pageSize);
  }

  pageChanged(event:any){
    if(this.pageNumber !==event.page){
      this.pageNumber=event.page;
      this.loadlikes();
    }

  }

  ngOnDestroy(): void {
    this._likesServices.paginatedResult.set(null);
  }

}
