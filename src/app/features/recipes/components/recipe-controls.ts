import {Component, output} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMiniFabButton} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {RecipeType} from '../models/recipe-type';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-recipe-controls',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMiniFabButton,
    MatChipsModule,
    FormsModule
  ],
  template: `
    <div class="w-full">
      <div class="flex flex-col gap-1">
        <div class="flex gap-4 items-center pt-2 justify-center">
          <mat-form-field class="compact-field w-130">
            <mat-label>Recipe Search</mat-label>
            <input #search
                   matInput
                   placeholder="Recipe Name..."
                   (input)="searchChanged.emit(search.value)"
            >
            <mat-icon matPrefix>search</mat-icon>
          </mat-form-field>
          <button matMiniFab (click)="addClicked.emit()">
            <mat-icon>add</mat-icon>
          </button>
        </div>
        <div class="flex justify-center">
          <mat-chip-listbox
            aria-orientation="horizontal"
            multiple
            [(ngModel)]="selectedTypes"
            (change)="recipeTypesChanged.emit($event.value)"
          >
            @for (option of recipeTypes; track option) {
              <mat-chip-option
                [value]="option.value"
                [selected]="selectedTypes.includes(option.value)">
                {{ option.key }}
              </mat-chip-option>
            }
          </mat-chip-listbox>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class RecipeControls {
  searchChanged = output<string>();
  recipeTypesChanged = output<RecipeType[]>();
  addClicked = output();

  readonly recipeTypes = Object.keys(RecipeType)
    .filter(k => isNaN(Number(k)))
    .map(key => ({ key, value: RecipeType[key as keyof typeof RecipeType] }));

  selectedTypes: RecipeType[] = [RecipeType.Food, RecipeType.Snack, RecipeType.Drink];
}
