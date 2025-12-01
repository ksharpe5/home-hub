import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {Device} from '../models/device';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-device-form',
  imports: [
    MatIconButton,
    MatDialogClose,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  template: `
    <div class="flex flex-col gap-4 p-4">
      <div class="flex items-center">
        <h1 class="text-xl">{{ data == undefined ? 'New Device' : data.deviceName }}</h1>
        <button matIconButton mat-dialog-close class="ml-auto">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <mat-form-field>
        <mat-label>IP Address</mat-label>
        <input matInput [(ngModel)]="deviceIp">
      </mat-form-field>

      <div class="flex gap-4 justify-end">
        <button matButton (click)="dialogRef.close(undefined)">Cancel</button>
        <button matButton="filled" (click)="dialogRef.close(deviceIp)">
          {{ data == undefined ? 'Create' : 'Update' }}
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class DeviceForm {
  readonly data: Device | undefined = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<DeviceForm>);

  deviceIp: string = '';

  constructor() {
    if (this.data !== undefined) {
      this.deviceIp = this.data.ipAddress;
    }
  }
}
