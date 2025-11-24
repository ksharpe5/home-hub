import {Component, signal} from '@angular/core';
import {Recipe} from '../models/recipe';
import {RecipeType} from '../models/recipe-type';
import {Field, form} from '@angular/forms/signals';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {RangePipe} from '../../../shared/pipes/range';
import {MatIconButton} from '@angular/material/button';
import {Ingredient} from '../../../shared/models/ingredient';
import {MatChipsModule} from '@angular/material/chips';
import {FormsModule} from '@angular/forms';
import {Unit} from '../../../shared/models/unit';
import {Instruction} from '../models/instruction';
import {RecipeFormChip} from './recipe-form-chip';
import {IngredientTextPipe} from '../pipes/ingredient-text';

@Component({
  selector: 'app-recipe-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    RangePipe,
    Field,
    MatIconButton,
    MatChipsModule,
    FormsModule,
    RecipeFormChip,
    IngredientTextPipe
  ],
  template: `
    <div class="max-h-full overflow-auto">

      <h1 class="mb-2 text-lg font-bold">Recipe Info</h1>
      <section class="grid grid-cols-3 gap-2 p-2">
        <mat-form-field class="col-span-3">
          <mat-label>Name</mat-label>
          <input matInput type="text" placeholder="Name..." [field]="recipeForm.name">
        </mat-form-field>

        <mat-form-field class="col-span-1">
          <mat-label>Type</mat-label>
          <mat-select [field]="recipeForm.type">
            @for (type of recipeTypes; track type) {
              <mat-option [value]="type">{{ RecipeType[type] }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field class="col-span-1">
          <mat-label>Serves</mat-label>
          <input matInput type="number" placeholder="How many does it serve..." [field]="recipeForm.serves">
        </mat-form-field>

        <mat-form-field class="col-span-1">
          <mat-label>Duration (minutes)</mat-label>
          <input matInput type="number" placeholder="How long does it take..." [field]="recipeForm.duration">
        </mat-form-field>

        <mat-form-field class="col-span-1">
          <mat-label>Taste Rating</mat-label>
          <mat-select [field]="recipeForm.tasteRating">
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
          <mat-select [field]="recipeForm.effortRating">
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
          <mat-select [field]="recipeForm.healthyRating">
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

          <button mat-icon-button class="mx-4 mb-4" (click)="addIngredient()">
            <mat-icon>add</mat-icon>
          </button>
        </div>

        <!-- Ingredients Chips -->
        <div class="flex gap-2">
          @for (ingredient of ingredients(); track ingredient.id) {
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

          <button mat-icon-button class="mx-4 mb-4" (click)="addInstruction()">
            <mat-icon>add</mat-icon>
          </button>
        </div>

        <!-- Instructions Chips -->
        <div class="flex flex-col gap-2">
          @for (instruction of instructions(); track instruction.id) {
            <app-recipe-form-chip [text]="instruction.text" (delete)="removeInstruction(instruction)"/>
          }
        </div>
      </section>

    </div>
  `,
  styles: ``,
})
export class RecipeForm {
  readonly RecipeType = RecipeType
  readonly recipeTypes = Object.values(RecipeType)
    .filter(value => typeof value === 'number');

  readonly Unit = Unit;
  readonly unitTypes = Object.values(Unit)
    .filter(value => typeof value === 'number');

  // Form fields
  ingredientName: string = '';
  ingredientQuantity: number = 0;
  ingredientUnit: Unit = Unit.grams;

  instructionText: string = '';

  ingredients = signal<Ingredient[]>([])
  instructions = signal<Instruction[]>([])
  recipeModel = signal<Recipe>({
    id: 0,
    duration: 0,
    ingredients: [],
    instructions: [],
    name: '',
    type: RecipeType.Food,
    serves: 1,
    healthyRating: 0,
    tasteRating: 0,
    effortRating: 0
  });
  recipeForm = form(this.recipeModel);

  addIngredient() {
    this.ingredients.update(current => [...current, {
        id: current.length + 1,
        name: this.ingredientName,
        quantity: this.ingredientQuantity,
        unit: this.ingredientUnit
      }]
    );
  }

  removeIngredient(ingredient: Ingredient) {
    this.ingredients.update(current =>
      current.filter(i => i.id !== ingredient.id)
    );
  }

  addInstruction() {
    this.instructions.update(current =>
      [...current, { id: current.length + 1, text: this.instructionText}]
    );
  }

  removeInstruction(instruction: Instruction) {
    this.instructions.update(current =>
      current.filter(i => i.id !== instruction.id)
    );
  }

}
