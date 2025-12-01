import {Component, inject, OnInit} from '@angular/core';
import {SmartHomeService} from '../services/smart-home';
import {Device as DeviceModel} from '../models/device';
import {Device} from '../components/device';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {DeviceForm} from '../components/device-form';

@Component({
  selector: 'app-smart-home',
  imports: [
    Device,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="flex p-4">
      <button matButton="filled" (click)="refreshDeviceList()">Refresh Device List</button>
      <button matMiniFab class="ml-auto" (click)="openDeviceDialog()">
        <mat-icon>add</mat-icon>
      </button>
    </div>
    <div class="grid grid-cols-2 gap-4 py-4">
        @for (device of smartHomeService.devices(); track device.id) {
            <app-device [device]="device" (toggleState)="toggleDeviceState(device)" (edit)="openDeviceDialog(device)" />
        }
    </div>
  `,
  styles: ``,
})
export default class SmartHome implements OnInit {
  readonly smartHomeService = inject(SmartHomeService);
  readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.refreshDeviceList()
  }

  refreshDeviceList() {
    this.smartHomeService.getAll();
  }

  toggleDeviceState(device: DeviceModel) {
    device.isOn ? this.smartHomeService.turnOff(device) : this.smartHomeService.turnOn(device);
  }

  openDeviceDialog(device: DeviceModel | undefined = undefined) {
    const dialog = this.dialog.open(DeviceForm, { data: device });
    dialog.afterClosed().subscribe((result: string | undefined) => {
      if (result == undefined) return;

      if (device === undefined) {
        // Create new device and add it to the db

      } else {
        // Update the device we opened the dialog with
      }
    });
  }
}
