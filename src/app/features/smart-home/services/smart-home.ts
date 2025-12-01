import {inject, Injectable, signal} from '@angular/core';
import {HomeHubApi} from '../../../shared/services/home-hub-api';
import {Device} from '../models/device';
import {Recipe} from '../../recipes/models/recipe';

@Injectable({
  providedIn: 'root',
})
export class SmartHomeService {
  private readonly api = inject(HomeHubApi);

  devices = signal<Device[]>([]);

  getAll() {
    this.api.get<Device[]>('devices').subscribe(devices => {
      this.devices.set(devices);
    });
  }

  create(device: Partial<Device>) {
    this.api.post<Device>('devices', device).subscribe(r => {
      this.devices.update(list => [r, ...list]);
    })
  }

  update(device: Partial<Device>) {
    this.api.put<Device>('devices', device).subscribe(r => {
      this.devices.update(list => list.map(x => (x.id === device.id ? r : x)));
    });
  }

  delete(device: Device) {
    this.api.delete(`devices/${device.id}`).subscribe(() => {
      this.devices.update(list => list.filter(x => x.id !== device.id));
    })
  }

  turnOff(device: Device) {
    this.api.post<Device>(`devices/off?ipAddress=${device.ipAddress}`, {})
      .subscribe(result => {
        this.devices.update(list =>
          list.map(x => (x.id === device.id ? result : x))
        );
      });
  }

  turnOn(device: Device) {
    this.api.post<Device>(`devices/on?ipAddress=${device.ipAddress}`, {})
      .subscribe(result => {
        this.devices.update(list =>
          list.map(x => (x.id === device.id ? result : x))
        );
      });
  }
}
