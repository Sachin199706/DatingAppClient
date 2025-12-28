import { Component, computed, inject, input } from '@angular/core';
import { Member } from '../../Models/member';
import { RouterLink } from "@angular/router";
import { LikesService } from '../../_Services/likes.service';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
//@Input() member!: Member;

private _likesServices=inject(LikesService);
member=input.required<Member>();
hasLiked=computed(()=>this._likesServices.likeIds().includes(this.member().id));

toggleLike(){
  this._likesServices.toggleLike(this.member().id).subscribe({
    next:_=>{
      if(this.hasLiked()){
          this._likesServices.likeIds.update(ids=>ids.filter(x=>x !==this.member().id));
      }
      else{
            this._likesServices.likeIds.update(ids=>[...ids,this.member().id]);
      }
    }
  })
}

}
