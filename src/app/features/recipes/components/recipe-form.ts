import {Component, inject, signal} from '@angular/core';
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
import {IngredientTextPipe} from '../pipes/ingredient-text';
import {Recipe} from '../models/recipe';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-recipe-form',
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    RangePipe,
    MatIconButton,
    MatChipsModule,
    FormsModule,
    IngredientTextPipe,
    MatButtonModule,
    CdkDropList,
    CdkDrag
  ],
  template: `
    <div class="overflow-auto flex flex-col p-4">

      <mat-stepper #stepper>
        <mat-step>
          <ng-template matStepLabel>Recipe Info</ng-template>
          <section class="grid grid-cols-3 gap-2 p-2 my-4">
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
          <div class="flex gap-4 mt-6">
            <button matButton class="ml-auto" (click)="dialogRef.close(undefined)">Cancel</button>
            <button matButton="filled" (click)="closeWithModel()">
              {{ data == undefined ? 'Create' : 'Update' }}
            </button>
          </div>
        </mat-step>
        <mat-step>
          <ng-template matStepLabel>Ingredients</ng-template>
          <div class="flex gap-2 my-4">
            <div class="flex flex-col gap-2">
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

              <button matButton="filled" (click)="addIngredient()">
                <mat-icon>add</mat-icon>
                Add Ingredient
              </button>
            </div>
            <div cdkDropList class="drag-list" (cdkDropListDropped)="dropIngredient($event)">
              @for (ingredient of ingredients(); track ingredient) {
                <div class="drag-box" cdkDrag [cdkDragStartDelay]="200">
                  {{ ingredient | ingredientText }}
                  <button matIconButton (click)="removeIngredient(ingredient)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              }
            </div>
          </div>
          <div class="flex gap-4 mt-6">
            <button matButton class="ml-auto" (click)="dialogRef.close(undefined)">Cancel</button>
            <button matButton="filled" (click)="closeWithModel()">
              {{ data == undefined ? 'Create' : 'Update' }}
            </button>
          </div>
        </mat-step>
        <mat-step>
          <ng-template matStepLabel>Instructions</ng-template>

          <div class="flex gap-2 my-4">
            <div class="flex flex-col gap-2">
              <mat-form-field>
                <mat-label>Text</mat-label>
                <textarea matInput type="text" placeholder="How to complete this step..." rows="6" [(ngModel)]="instructionText">
                </textarea>
              </mat-form-field>

              <button matButton="filled" class="mx-2 mb-4" (click)="addInstruction()">
                <mat-icon>add</mat-icon>
                Add Instruction
              </button>
            </div>
            <div cdkDropList class="drag-list" (cdkDropListDropped)="dropInstruction($event)">
              @for (instruction of instructions(); track instruction) {
                <div class="drag-box" cdkDrag [cdkDragStartDelay]="200">
                  {{ instruction.text }}
                  <button matIconButton (click)="removeInstruction(instruction)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              }
            </div>
          </div>
          <div class="flex gap-4 mt-6">
            <button matButton class="ml-auto" (click)="dialogRef.close(undefined)">Cancel</button>
            <button matButton="filled" (click)="closeWithModel()">
              {{ data == undefined ? 'Create' : 'Update' }}
            </button>
          </div>
        </mat-step>
      </mat-stepper>


    </div>
  `,
  styles: `
    .drag-list {
      width: 500px;
      max-width: 100%;
      border: solid 1px #ccc;
      min-height: 60px;
      max-height: 280px;
      display: block;
      border-radius: 8px;
      overflow: auto;
    }
    .drag-box {
      padding: 20px 10px;
      border-bottom: solid 1px #ccc;
      color: rgba(0, 0, 0, 0.87);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      cursor: move;
    }

    .cdk-drag-preview {
      border: none;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }
    .cdk-drag-placeholder {
      opacity: 0;
    }
    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
    .drag-list.cdk-drop-list-dragging .drag-box:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }`,
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
      this.ingredients.set(
        [...this.data.ingredients].sort((a, b) => a.sequenceNumber - b.sequenceNumber)
      );
      this.instructions.set(
        [...this.data.instructions].sort((a, b) => a.sequenceNumber - b.sequenceNumber)
      );
    }
  }

  addIngredient() {
    this.ingredients.update(current => [...current, {
      recipeId: this.data?.id ?? undefined,
      name: this.ingredientName,
      quantity: this.ingredientQuantity,
      unit: this.ingredientUnit,
    }]);

    this.ingredientName = '';
    this.ingredientQuantity = 0;
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

    this.instructionText = '';
  }

  removeInstruction(instruction: Partial<Instruction>) {
    this.instructions.update(current =>
      current.filter(e => e !== instruction)
    );
  }

  dropIngredient(event: CdkDragDrop<Ingredient[]>) {
    moveItemInArray(this.ingredients(), event.previousIndex, event.currentIndex);
  }

  dropInstruction(event: CdkDragDrop<Instruction[]>) {
    moveItemInArray(this.instructions(), event.previousIndex, event.currentIndex);
  }

  closeWithModel() {
    // set the order number of each list
    let order = 0;
    this.ingredients().forEach((ingredient: Partial<Ingredient>) => {
      ingredient.sequenceNumber = order++;
    });

    order = 0;
    this.instructions().forEach((instruction: Partial<Instruction>) => {
      instruction.sequenceNumber = order++;
    });

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
