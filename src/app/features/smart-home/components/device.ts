import {Component, input, output} from '@angular/core';
import {Device as DeviceModel} from '../models/device';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-device',
  imports: [
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <div
      class="flex gap-2 border border-black rounded-lg px-4 py-2 items-center"
    >
      <button matIconButton (click)="edit.emit()">
        <mat-icon>edit</mat-icon>
      </button>
      <h1 class="text-lg">{{ device().deviceName }}</h1>
      <mat-slide-toggle class="ml-auto" [checked]="device().isOn" (toggleChange)="toggleState.emit()" />
    </div>
  `,
  styles: ``,
})
export class Device {
  device = input.required<DeviceModel>();

  toggleState = output();
  edit = output();
}
