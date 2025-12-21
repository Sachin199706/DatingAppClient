import { Component, HostListener, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { Member } from '../../Models/member';
import { AccountService } from '../../../_Services/account.service';
import { MembersService } from '../../../_Services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  Member?: Member;
  _accountService: AccountService = inject(AccountService);
  _memberService: MembersService = inject(MembersService);
  _toastService: ToastrService = inject(ToastrService);
  ngOnInit(): void {
    this.loadMember();
  }
  loadMember() {
    const username = this._accountService.currentUser()?.username;
    if (!username) return;
    this._memberService.getMember(username).subscribe({
      next: member => {
        this.Member = member;
      }
    });
  }

  updateMember() {
    if (!this.editForm) return;
    this._memberService.UPdateMember(this.editForm.value).subscribe({
      next: _ => {
        this._toastService.success("Profile updated successfully");
        this.editForm?.reset(this.Member);
      }
    });
  }

}
