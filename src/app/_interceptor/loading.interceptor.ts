import { HttpInterceptorFn } from '@angular/common/http';
import { BusyService } from '../../_Services/busy.service';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
 const _busyService = inject(BusyService);
  _busyService.busy();
  return next(req).pipe(
    delay(1000),
    finalize(() => {
      _busyService.idle();
    }
  )
  );
};
