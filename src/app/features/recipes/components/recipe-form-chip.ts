import {Component, input, output} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-recipe-form-chip',
  imports: [
    MatIconButton,
    MatIconModule
  ],
  template: `
    <div class="flex gap-2 border rounded-xl items-center">
      <span class="flex-1 p-2">{{ text() }}</span>
      <button matIconButton (click)="delete.emit()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
  styles: ``,
})
export class RecipeFormChip {
  delete = output();
  text = input.required<string>();
}
