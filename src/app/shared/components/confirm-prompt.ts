import {Component, inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-confirm-prompt',
  imports: [MatButtonModule],
  template: `
    <div class="flex flex-col gap-6 p-6">
      <h2>Are you sure?</h2>
      <div class="flex gap-2 justify-end">
        <button matButton (click)="dialogRef.close(false)">Cancel</button>
        <button matButton="filled" (click)="dialogRef.close(true)">Delete</button>
      </div>
    </div>
  `,
  styles: ``,
})
export class ConfirmPrompt {
    dialogRef = inject(MatDialogRef<ConfirmPrompt>);
}
