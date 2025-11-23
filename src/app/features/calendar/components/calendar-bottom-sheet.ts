import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-calendar-bottom-sheet',
  imports: [
    MatButton
  ],
  template: `
    <div class="flex flex-col gap-4 m-4">
      <h1 class="font-bold text-2xl">Delete Event</h1>
      <div class="flex justify-around my-3">
        <button matButton (click)="sheetRef.dismiss(false)">Cancel</button>
        <button matButton="filled" (click)="sheetRef.dismiss(true)">Delete</button>
      </div>
    </div>
  `,
  styles: ``,
})
export class CalendarBottomSheet {
  sheetRef = inject(MatBottomSheetRef);
}
