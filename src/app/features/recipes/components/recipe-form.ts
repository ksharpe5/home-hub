import {Component, inject, viewChild} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Recipe} from '../models/recipe';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {ProductService} from '../../products/services/product';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {RecipeFormInfo} from './recipe-form-info';
import {RecipeFormIngredients} from './recipe-form-ingredients';
import {Ingredient} from '../models/ingredient';
import {Instruction} from '../models/instruction';
import {RecipeFormInstructions} from './recipe-form-instructions';

@Component({
  selector: 'app-recipe-form',
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    FormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    RecipeFormInfo,
    RecipeFormIngredients,
    RecipeFormInstructions,
  ],
  template: `
    <h2 mat-dialog-title>{{ data === undefined ? 'New Recipe' : data.name }}</h2>
    <mat-dialog-content>
        <mat-stepper>
          <mat-step>
            <ng-template matStepLabel>Recipe Info</ng-template>
            <div class="py-4">
              <app-recipe-form-info #recipeFormInfo [recipe]="data" />
            </div>
          </mat-step>
          <mat-step>
            <ng-template matStepLabel>Ingredients</ng-template>
            <div class="py-4">
                <app-recipe-form-ingredients #recipeIngredients [recipe]="data" />
            </div>
          </mat-step>
          <mat-step>
            <ng-template matStepLabel>Instructions</ng-template>
            <div class="py-4">
                <app-recipe-form-instructions #recipeInstructions [recipe]="data"/>
            </div>
          </mat-step>
        </mat-stepper>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton class="ml-auto" (click)="dialogRef.close(undefined)">Cancel</button>
      <button matButton="filled" (click)="closeWithModel()">
        {{ data == undefined ? 'Create' : 'Update' }}
      </button>
    </mat-dialog-actions>
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
  recipeInfo = viewChild.required<RecipeFormInfo>('recipeFormInfo');
  recipeIngredients = viewChild.required<RecipeFormIngredients>('recipeIngredients');
  recipeInstructions = viewChild.required<RecipeFormInstructions>('recipeInstructions');

  readonly dialogRef = inject(MatDialogRef<RecipeForm>);
  readonly data: Recipe | undefined = inject(MAT_DIALOG_DATA);

  closeWithModel() {
    const recipe: Partial<Recipe> = {
      id: this.data?.id ?? undefined,
      ...this.recipeInfo().getCurrentValues(),
      ingredients: this.recipeIngredients().getCurrentValues() as Ingredient[],
      instructions: this.recipeInstructions().getCurrentValues() as Instruction[]
    };

    this.dialogRef.close(recipe);
  }
}
