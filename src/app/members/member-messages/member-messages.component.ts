import { Component, inject,  input,  output, ViewChild } from '@angular/core';
import { MessageService } from '../../_Services/message.service';
import { Message } from '../../Models/Message';
import { TimeagoModule} from 'ngx-timeago';
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [TimeagoModule, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent  {
 // old way @Input() username!:string;
 @ViewChild('messageForm') messageForm?:NgForm;
 private _messageServices=inject(MessageService);
 username=input.required<string>();
 messages=input.required<Message[]>();
 messageContent='';
 updateMessage=output<Message>();

 SendMessage(){
  if(!this.messageContent) return;
  this._messageServices.sendMessage(this.username(),this.messageContent).subscribe({
    next:(res:Message)=>{
        this.updateMessage.emit(res);
        this.messageForm?.reset();
    }
  })
 }



 

}
