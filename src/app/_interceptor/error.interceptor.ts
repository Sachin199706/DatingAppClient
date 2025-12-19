import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _router = inject(Router);
  const _toaster:ToastrService= inject(ToastrService);
  
  return next(req).pipe(
    catchError(error => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modelStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modelStateErrors.push(error.error.errors[key])
                }
              }
              throw modelStateErrors.flat();
            } else {
                _toaster.error(error.error)
            }
            break;
          case 401:
            _toaster.error('Unauthorized');
            break;
          case 404:
            _router.navigateByUrl('/not-found')
            break;
          case 500:
            const navigationExtras: NavigationExtras = {state: {error: error.error}}
            _router.navigateByUrl('/server-error', navigationExtras)
            break;
          default:
            _toaster.error('Something went wrong');
            break;
        }
      }

      throw error;
    })
  )
};
