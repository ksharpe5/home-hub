import {Component, output} from '@angular/core';
import {MatChipListbox, MatChipOption} from '@angular/material/chips';
import {MatFormField, MatInput, MatLabel, MatPrefix} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';

@Component({
  selector: 'app-product-search',
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatMiniFabButton,
    MatPrefix
  ],
  template: `
    <div class="w-full">
        <div class="flex gap-4 items-center pt-2 justify-center">
          <mat-form-field class="compact-field w-130">
            <mat-label>Product Search</mat-label>
            <input #search
                   matInput
                   placeholder="Product Name..."
                   (input)="searchChanged.emit(search.value)"
            >
            <mat-icon matPrefix>search</mat-icon>
          </mat-form-field>
          <button matMiniFab (click)="addClicked.emit()">
            <mat-icon>add</mat-icon>
          </button>
        </div>
    </div>
  `,
  styles: ``,
})
export class ProductSearch {
  searchChanged = output<string>();
  addClicked = output();
}
