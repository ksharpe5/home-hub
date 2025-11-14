import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent
  ],
  template: `
  <h1 class="text-2xl pb-4 font-bold">Dashboard</h1>
  <div class="grid grid-cols-2 gap-4">
    <mat-card class="col-span-1" appearance="filled">
      <mat-card-header>
        <mat-card-title class="font-bold!">Today's Events</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p class="py-4">
          This is going to be a list of events for today
        </p>
      </mat-card-content>
    </mat-card>
    <mat-card class="col-span-1" appearance="filled">
      <mat-card-header>
        <mat-card-title class="font-bold!">Expiring Soon!</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p class="py-4">
          This is going to be a list of inventory items that are expiring soon
        </p>
      </mat-card-content>
    </mat-card>
  </div>
  `,
  styles: ``,
})
export default class Dashboard {

}
