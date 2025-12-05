import {inject, Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  readonly toastr = inject(ToastrService);

  success(title: string, message: string = "") {
    this.toastr.success(title, message);
  }

  error(title: string, message: string = "") {
    this.toastr.error(title, message);
  }

  warning(title: string, message: string = "") {
    this.toastr.warning(title, message);
  }

  info(title: string, message: string = "") {
    this.toastr.info(title, message);
  }
}
