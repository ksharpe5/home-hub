import {Component, inject, input, output, signal} from '@angular/core';
import {RecipeType} from '../models/recipe-type';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {RangePipe} from '../../../shared/pipes/range';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {Ingredient} from '../../../shared/models/ingredient';
import {MatChipsModule} from '@angular/material/chips';
import {FormsModule} from '@angular/forms';
import {Unit} from '../../../shared/models/unit';
import {Instruction} from '../models/instruction';
import {RecipeFormChip} from './recipe-form-chip';
import {IngredientTextPipe} from '../pipes/ingredient-text';
import {Recipe} from '../models/recipe';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    RangePipe,
    MatIconButton,
    MatChipsModule,
    FormsModule,
    RecipeFormChip,
    IngredientTextPipe,
    MatButtonModule
  ],
  template: `
    <div class="overflow-auto flex flex-col p-4">

      <div class="flex justify-between">
        <h1 class="mb-2 text-lg font-bold">Recipe Info</h1>

        <button matIconButton class="m-2" (click)="dialogRef.close(undefined)">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <section class="grid grid-cols-3 gap-2 p-2">
        <mat-form-field class="col-span-3">
          <mat-label>Name</mat-label>
          <input matInput type="text" placeholder="Name..." [(ngModel)]="recipeName">
        </mat-form-field>

        <mat-form-field class="col-span-1">
          <mat-label>Type</mat-label>
          <mat-select [(ngModel)]="recipeType">
            @for (type of recipeTypes; track type) {
              <mat-option [value]="type">{{ RecipeType[type] }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field class="col-span-1">
          <mat-label>Serves</mat-label>
          <input matInput type="number" placeholder="How many does it serve..." [(ngModel)]="serves">
        </mat-form-field>

        <mat-form-field class="col-span-1">
          <mat-label>Duration (minutes)</mat-label>
          <input matInput type="number" placeholder="How long does it take..." [(ngModel)]="duration">
        </mat-form-field>

        <mat-form-field class="col-span-1">
          <mat-label>Taste Rating</mat-label>
          <mat-select [(ngModel)]="tasteRating">
            <mat-select-trigger>
              <div class="flex items-center">
                @for (star of (tasteRating | range); track star) {
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
          <mat-select [(ngModel)]="effortRating">
            <mat-select-trigger>
              <div class="flex items-center">
                @for (star of (effortRating | range); track star) {
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
          <mat-label>Health Rating</mat-label>
          <mat-select [(ngModel)]="healthyRating">
            <mat-select-trigger>
              <div class="flex items-center">
                @for (star of (healthyRating | range); track star) {
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
      </section>

      <section class="p-2">
        <h1 class="mb-2 text-lg font-bold">Ingredients</h1>

        <div class="flex gap-2 items-center">
          <mat-form-field class="flex-1">
            <mat-label>Name</mat-label>
            <input matInput type="text" placeholder="Name..." [(ngModel)]="ingredientName">
          </mat-form-field>

          <mat-form-field class="flex-1">
            <mat-label>Quantity</mat-label>
            <input matInput type="number" placeholder="How much..." [(ngModel)]="ingredientQuantity">
          </mat-form-field>

          <mat-form-field class="flex-1">
            <mat-label>Unit</mat-label>
            <mat-select [(ngModel)]="ingredientUnit">
              @for (type of unitTypes; track type) {
                <mat-option [value]="type">{{ Unit[type] }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <button mat-icon-button class="mx-2 mb-4" (click)="addIngredient()">
            <mat-icon>add</mat-icon>
          </button>
        </div>

        <!-- Ingredients Chips -->
        <div class="flex gap-2">
          @for (ingredient of ingredients(); track $index) {
            <app-recipe-form-chip text="{{ingredient | ingredientText}}" (delete)="removeIngredient(ingredient)"/>
          }
        </div>
      </section>

      <section class="p-2">
        <h1 class="mb-2 text-lg font-bold">Instructions</h1>

        <div class="flex gap-2 items-center">
          <mat-form-field class="flex-1">
            <mat-label>Text</mat-label>
            <textarea matInput type="text" placeholder="How to complete this step..." [(ngModel)]="instructionText">
            </textarea>
          </mat-form-field>

          <button mat-icon-button class="mx-2 mb-4" (click)="addInstruction()">
            <mat-icon>add</mat-icon>
          </button>
        </div>

        <!-- Instructions Chips -->
        <div class="flex flex-col gap-2">
          @for (instruction of instructions(); track $index) {
            <app-recipe-form-chip [text]="instruction.text!" (delete)="removeInstruction(instruction)"/>
          }
        </div>
      </section>

      <div class="ml-auto m-4">
        <button matButton="filled" (click)="closeWithModel()">
          {{ data == undefined ? 'Create' : 'Update' }}
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class RecipeForm {
  readonly dialogRef = inject(MatDialogRef<RecipeForm>);
  readonly data: Recipe | undefined = inject(MAT_DIALOG_DATA);

  readonly RecipeType = RecipeType
  readonly recipeTypes = Object.values(RecipeType)
    .filter(value => typeof value === 'number');

  readonly Unit = Unit;
  readonly unitTypes = Object.values(Unit)
    .filter(value => typeof value === 'number');

  // Form fields
  recipeName: string = '';
  recipeType: RecipeType = RecipeType.Food;
  serves: number = 0;
  duration: number = 0;
  tasteRating: number = 1;
  effortRating: number = 1;
  healthyRating: number = 1;
  ingredientName: string = '';
  ingredientQuantity: number = 0;
  ingredientUnit: Unit = Unit.grams

  instructionText: string = '';

  ingredients = signal<Partial<Ingredient>[]>([]);
  instructions = signal<Partial<Instruction>[]>([]);

  constructor() {
    if (this.data !== undefined) {
      this.recipeName = this.data.name;
      this.recipeType = this.data.type;
      this.serves = this.data.serves;
      this.duration = this.data.duration;
      this.tasteRating = this.data.tasteRating;
      this.effortRating = this.data.effortRating;
      this.healthyRating = this.data.healthyRating;
      this.ingredients.set(this.data.ingredients);
      this.instructions.set(this.data.instructions);
    }
  }

  addIngredient() {
    this.ingredients.update(current => [...current, {
      recipeId: this.data?.id ?? undefined,
      name: this.ingredientName,
      quantity: this.ingredientQuantity,
      unit: this.ingredientUnit,
    }]);
  }

  removeIngredient(ingredient: Partial<Ingredient>) {
    this.ingredients.update(current =>
      current.filter(e => e !== ingredient)
    );
  }

  addInstruction() {
    this.instructions.update(current =>
      [...current, {
      recipeId: this.data?.id ?? undefined,
        text: this.instructionText
      }]
    );
  }

  removeInstruction(instruction: Partial<Instruction>) {
    this.instructions.update(current =>
      current.filter(e => e !== instruction)
    );
  }

  closeWithModel() {
    const newRecipe: Partial<Recipe> = {
      id: this.data?.id ?? undefined,
      name: this.recipeName ?? 'Undefined Name',
      type: this.recipeType ?? RecipeType.Food,
      serves: this.serves ?? 0,
      duration: this.duration ?? 0,
      tasteRating: this.tasteRating ?? 0,
      effortRating: this.effortRating ?? 0,
      healthyRating: this.healthyRating ?? 0,
      ingredients: this.ingredients() as Ingredient[],
      instructions: this.instructions() as Instruction[],
    }

    this.dialogRef.close(newRecipe);
  }
}
