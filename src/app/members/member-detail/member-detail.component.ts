import { Component, inject, OnInit, viewChild } from '@angular/core';
import { MembersService } from '../../_Services/members.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Member } from '../../Models/member';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { DatePipe } from '@angular/common';
import { MemberMessagesComponent } from "../member-messages/member-messages.component";
import { Message } from '../../Models/Message';
import { MessageService } from '../../_Services/message.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule, GalleryModule, TimeagoModule, DatePipe, MemberMessagesComponent],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {
  __messageServices = inject(MessageService);
  @ViewChild('memberTabs',{static:true}) memberTabs?: TabsetComponent;
  _memberservice: MembersService = inject(MembersService);
  _activeRoute: ActivatedRoute = inject(ActivatedRoute);
  Member: Member={} as Member ;
  images: GalleryItem[] = [];
  activeTab?: TabDirective;
  messages: Message[] = [];

  ngOnInit(): void {

    this._activeRoute.data.subscribe({
      next: (res) => {
        this.Member = res['member'];
        this.Member && this.Member.photos.map(p => {
          this.images.push(new ImageItem({
            src: p.url,
            thumb: p.url
          }))

        })
      }
    })

    this._activeRoute.queryParams.subscribe({
      next: (params: Params) => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })
  }

  selectTab(heading: string) {
    if (!this.memberTabs) return;
    const messageTab = this.memberTabs.tabs.find(x => x.heading == heading);
    if (!messageTab) return;
    messageTab.active = true;
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0 && this.Member) {
      this.__messageServices.getMessageThread(this.Member.username).subscribe({
        next: (res: Message[]) => {
          this.messages = res;
        }
      })
    }
  }
  // loadMember() {
  //   const username = this._activeRoute.snapshot.paramMap.get('username');
  //   if (!username) return;
  //   this._memberservice.getMember(username).subscribe({
  //     next: (response: Member) => {
  //       this.Member = response;
  //       response.photos.map(p => {
  //         this.images.push(new ImageItem({
  //           src: p.url,
  //           thumb: p.url
  //         }))
  //       })
  //     }

  //   });
  // }

  UpdateMessage(event:Message){
    this.messages.push(event);
  }
}
