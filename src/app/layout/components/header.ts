import {Component, OnDestroy, OnInit, output, signal} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {DatePipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    DatePipe,
    MatIconButton,
    MatIcon
  ],
  template: `
    <mat-toolbar class="flex gap-4">
      <button matIconButton (click)="menuClicked.emit()">
        <mat-icon>menu</mat-icon>
      </button>
      <span class="text-3xl font-bold">{{ currentDate() | date:'EEEE, MMMM d'}}</span>
      <span class="ml-auto text-2xl">{{ currentDate() | date:'HH:mm' }}</span>
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header implements OnInit, OnDestroy {
  menuClicked = output<void>();
  readonly currentDate = signal<Date>(new Date());

  private intervalId?: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentDate.set(new Date());
    }, 1000); // update every second
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
