import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRequestCount = 0;
  private spinnerService=inject(NgxSpinnerService);

  busy(){
    this.busyRequestCount++;
    this.spinnerService.show(undefined,{
      type: 'ball-beat',
      bdColor: 'rgba(76, 128, 108, 0)',
      color: '#914949ff',
      size: 'medium'
    });
  }
  idle(){
    this.busyRequestCount--;
    if(this.busyRequestCount<=0){
      this.busyRequestCount=0;
      this.spinnerService.hide();
    }
  }
}
