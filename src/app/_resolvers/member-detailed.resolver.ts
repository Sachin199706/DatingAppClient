import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MemberListComponent } from '../members/member-list/member-list.component';
import { MembersService } from '../_Services/members.service';
import { Member } from '../Models/member';

export const memberDetailedResolver: ResolveFn<Member|null> = (route, state) => {
  const username=route.paramMap.get('username');
  if(!username) return null;
  const _memberServices=inject(MembersService);


  return _memberServices.getMember(username);
};
