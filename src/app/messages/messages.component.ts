import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../_Services/message.service';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { Message } from '../Models/Message';
import {Router, RouterLink } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ContextMenuComponent } from "../shared/context-menu/context-menu.component";


@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ButtonsModule, FormsModule, TimeagoModule, PaginationModule, MatMenuModule, MatIconModule, ContextMenuComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit{
_messageServices:MessageService=inject(MessageService);
container="Inbox";
pageNumber=1;
pageSize=5;
 showMenu = false;
  menuX = 0;
  menuY = 0;
 @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
selectedMessage: Message|undefined;
router = inject(Router);  
isOutPut=this.container==='Outbox';


openMenu(event: MouseEvent, message: any) {
  event.preventDefault();
  event.stopPropagation();

  this.selectedMessage = message;
     this.menuX = event.clientX;
    this.menuY = event.clientY;
    this.showMenu = true;

    // OPTIONAL: move menu to mouse position
    //this.menuTrigger.menu.focusFirstItem('mouse');
}
deleteMessage(id:number){
  this._messageServices.deleteMessage(id).subscribe({
    next:_=>{
      this._messageServices.paginatedResult.update(pre=>{
        if(pre && pre.items){
          pre.items.splice(pre.items.findIndex(m=>m.id===id),1);
          return pre;
        }
        return pre;
      })
    }
  })
}

navigateToUser() {
  if(!this.selectedMessage){
    return;
  }
  const username =this.getRoute(this.selectedMessage);
    

  this.router.navigate([username],{queryParams:{tab:'Messages'}});
  this.showMenu=true;
 
}

  ngOnInit(): void {
    document.addEventListener('click', () => {
      this.showMenu = false;
    });
    this.loadMessages();
  }

  loadMessages(){
    this._messageServices.getMessage(this.pageNumber,this.pageSize,this.container);
  }

  pageChanged(event:any){
    if(this.pageNumber !==event.page){
      this.pageNumber=event.page;
      this.loadMessages();
    }
  }

  getRoute(mess:Message):string{
    if(this.container==='Outbox') return `/members/${mess.recipientUsername}`;
    else return `/members/${mess.senderUsername}`;

  }

  
}
