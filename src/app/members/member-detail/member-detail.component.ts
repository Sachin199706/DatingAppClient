import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../../_Services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../Models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule,GalleryModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {
  _memberservice: MembersService = inject(MembersService);
  _activeRoute: ActivatedRoute = inject(ActivatedRoute);
  Member: Member | null = null;
  images:GalleryItem[]=[];

  ngOnInit(): void {
    this.loadMember();
  }
  loadMember() {
    const username = this._activeRoute.snapshot.paramMap.get('username');
    if (!username) return;
    this._memberservice.getMember(username).subscribe({
      next: (response: Member) => {
        this.Member = response;
        this.images = this.Member.photos.map(photo => new ImageItem({
          src: photo.url,
          thumb: photo.url  
        }));
      }

    });
  }
}
