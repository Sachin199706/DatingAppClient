import { Component, inject, input, OnInit, output } from '@angular/core';
import { Member, Photo } from '../../Models/member';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AccountService } from '../../../_Services/account.service';
import { environment } from '../../../environments/environment.development';
import { MembersService } from '../../../_Services/members.service';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [CommonModule, FileUploadModule,DecimalPipe],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit {

  member = input.required<Member>();
  private _accountService = inject(AccountService);
  private _membersService = inject(MembersService);
  uploader?: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  baseUrl = environment.apiUrl;
  memberChange=output<Member>();


  ngOnInit(): void {
   this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this._accountService.getToken(),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        const updateMember = { ...this.member() };
        updateMember.photos.push(photo);
        this.memberChange.emit(updateMember);
      }
    };
  }


  setMainPhoto(Photo:Photo) {
    this._membersService.setMainPhoto(Photo).subscribe({
      next:_=>{
        const user=this._accountService.currentUser();
        if(!user) return;
        user.photoUrl=Photo.url;
        this._accountService.setCurrentUser(user);
        const updateMember={...this.member()};
        updateMember.photoUrl=Photo.url;
      updateMember.photos.forEach(p=>{
        if(p.isMain) p.isMain=false;
        if(p.id===Photo.id) p.isMain=true;
      });
        this.memberChange.emit(updateMember);
      }
    });
  }

  deltePhoto(photo:Photo){
    this._membersService.deletePhoto(photo).subscribe({
      next:_=>{
        const updateMember={...this.member()};
        updateMember.photos=updateMember.photos.filter(p=>p.id!==photo.id);
        this.memberChange.emit(updateMember);
      }
    });
  }
}