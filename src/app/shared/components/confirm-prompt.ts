import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-confirm-prompt',
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  template: `
    <h2 mat-dialog-title>Are you sure?</h2>
    @if (data.length > 0) {
      <mat-dialog-content>
        <span>{{ data }}</span>
      </mat-dialog-content>
    }
    <mat-dialog-actions>
      <button matButton (click)="dialogRef.close(false)">Cancel</button>
      <button matButton="filled" (click)="dialogRef.close(true)">Delete</button>
    </mat-dialog-actions>
  `,
  styles: ``,
})
export class ConfirmPrompt {
    dialogRef = inject(MatDialogRef<ConfirmPrompt>);
    data: string = inject(MAT_DIALOG_DATA);
}
