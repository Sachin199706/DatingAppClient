import { HttpInterceptorFn } from '@angular/common/http';
import { AccountService } from '../_Services/account.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const _accountService: AccountService=inject(AccountService);
 const request=req.clone({
    setHeaders:{
      Authorization:`Bearer ${_accountService.getToken()}`
    }
  });
  return next(request);
};
