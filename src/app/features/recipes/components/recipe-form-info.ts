import {Component, input, OnInit, output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {Recipe} from '../models/recipe';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {RecipeType} from '../models/recipe-type';
import {MatSelectModule} from '@angular/material/select';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {RangePipe} from '../../../shared/pipes/range';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-recipe-form-info',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RangePipe,
    MatIconModule,
  ],
  template: `
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-3 gap-4">
        <mat-form-field class="compact-field col-span-3">
          <mat-label>Name</mat-label>
          <input matInput type="text" placeholder="Name..." [formControl]="nameFormControl">
        </mat-form-field>

        <mat-form-field class="compact-field col-span-1">
          <mat-label>Type</mat-label>
          <mat-select [formControl]="typeFormControl">
            @for (rt of recipeTypes; track rt) {
              <mat-option [value]="rt">{{ RecipeType[rt] }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field class="compact-field col-span-1">
          <mat-label>Serves</mat-label>
          <input matInput type="number" placeholder="How many does it serve..." [formControl]="servesFormControl">
        </mat-form-field>

        <mat-form-field class="compact-field col-span-1">
          <mat-label>Duration (minutes)</mat-label>
          <input matInput type="number" placeholder="How long does it take..." [formControl]="durationFormControl">
        </mat-form-field>

        <!-- Ratings -->
        <mat-form-field class="col-span-1">
          <mat-label>Taste Rating</mat-label>
          <mat-select [formControl]="tasteRatingFormControl">
            <mat-select-trigger>
              <div class="flex items-center">
                @for (star of (tasteRatingFormControl.value ?? 1 | range); track star) {
                  <mat-icon class="!text-yellow-400 text-sm">star</mat-icon>
                }
              </div>
            </mat-select-trigger>
            @for (rating of (5 | range); track rating) {
              <mat-option [value]="rating">
                @for (stars of (rating | range); track stars) {
                  <mat-icon class="!text-yellow-400">star</mat-icon>
                }
              </mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field class="col-span-1">
          <mat-label>Effort Rating</mat-label>
          <mat-select [formControl]="effortRatingFormControl">
            <mat-select-trigger>
              <div class="flex items-center">
                @for (star of (effortRatingFormControl.value ?? 1 | range); track star) {
                  <mat-icon class="!text-yellow-400 text-sm">star</mat-icon>
                }
              </div>
            </mat-select-trigger>
            @for (rating of (5 | range); track rating) {
              <mat-option [value]="rating">
                @for (stars of (rating | range); track stars) {
                  <mat-icon class="!text-yellow-400">star</mat-icon>
                }
              </mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field class="col-span-1">
          <mat-label>Effort Rating</mat-label>
          <mat-select [formControl]="healthyRatingFormControl">
            <mat-select-trigger>
              <div class="flex items-center">
                @for (star of (healthyRatingFormControl.value ?? 1 | range); track star) {
                  <mat-icon class="!text-yellow-400 text-sm">star</mat-icon>
                }
              </div>
            </mat-select-trigger>
            @for (rating of (5 | range); track rating) {
              <mat-option [value]="rating">
                @for (stars of (rating | range); track stars) {
                  <mat-icon class="!text-yellow-400">star</mat-icon>
                }
              </mat-option>
            }
          </mat-select>
        </mat-form-field>
      </div>
    </div>
  `,
  styles: ``,
})
export class RecipeFormInfo implements OnInit {
  recipe = input.required<Recipe | undefined>();

  readonly RecipeType = RecipeType;
  readonly recipeTypes = Object.values(RecipeType)
    .filter(value => typeof value === 'number');

  nameFormControl = new FormControl();
  typeFormControl = new FormControl();
  servesFormControl = new FormControl();
  durationFormControl = new FormControl();
  effortRatingFormControl = new FormControl();
  tasteRatingFormControl = new FormControl();
  healthyRatingFormControl = new FormControl();

  ngOnInit() {
    this.nameFormControl.setValue(this.recipe()?.name ?? '');
    this.typeFormControl.setValue(this.recipe()?.type ?? RecipeType.Food);
    this.servesFormControl.setValue(this.recipe()?.serves ?? 0);
    this.durationFormControl.setValue(this.recipe()?.duration ?? 0);
    this.effortRatingFormControl.setValue(this.recipe()?.effortRating ?? 1);
    this.tasteRatingFormControl.setValue(this.recipe()?.tasteRating ?? 1);
    this.healthyRatingFormControl.setValue(this.recipe()?.healthyRating ?? 1);
  }

  getCurrentValues(): Partial<Recipe> {
    return {
      name: this.nameFormControl.value,
      type: this.typeFormControl.value,
      serves: this.servesFormControl.value,
      duration: this.durationFormControl.value,
      effortRating: this.effortRatingFormControl.value,
      tasteRating: this.tasteRatingFormControl.value,
      healthyRating: this.healthyRatingFormControl.value,
    };
  }
}
