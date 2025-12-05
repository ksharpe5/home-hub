import {Component, input, OnInit, output} from '@angular/core';
import {Recipe as RecipeModel} from '../models/recipe';
import {MatIconModule} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDrawer} from '@angular/material/sidenav';
import {UnitPipe} from '../../../shared/pipes/unit';
import {RecipeInstructionsList} from './recipe-instructions-list';
import {RecipeIngredientsList} from './recipe-ingredients-list';

@Component({
  selector: 'app-recipe',
  imports: [
    MatIconModule,
    MatIconButton,
    MatButton,
    RecipeInstructionsList,
    RecipeIngredientsList
  ],
  template: `
    <div class="flex flex-col gap-2 p-4">
      <div class="flex w-full justify-between">
        <h1 class="text-2xl font-bold">{{ recipe().name }}</h1>
        <button matIconButton (click)="drawer().close()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <!-- Recipe Info -->
      <div class="flex gap-2">
        <div class="border border rounded-2xl p-4 text-center">
          <span class="font-bold">Serves {{ recipe().serves }}</span>
        </div>

        <div class="border border rounded-2xl p-4 text-center">
          <span class="font-bold">Duration {{ recipe().duration }} minutes</span>
        </div>
      </div>

      <!-- Recipe Content Left/Right -->
      <div class="flex gap-4 h-[500px]">
        <!-- Instructions -->
        <div class="flex-[2] border rounded-2xl p-4 overflow-auto">
          <app-recipe-instructions-list [instructions]="recipe().instructions" />
        </div>

        <!-- Ingredients -->
        <div class="flex-[1] border rounded-2xl p-4 overflow-auto">
            <app-recipe-ingredients-list [ingredients]="recipe().ingredients" />
        </div>
      </div>

      <div class="flex mt-4 gap-2 justify-end">
        <button matButton="filled" (click)="drawer().close(); copy.emit(recipe())">Copy</button>
        <button matButton="filled" (click)="drawer().close(); update.emit(recipe())">Update</button>
        <button matButton="filled" (click)="delete.emit(recipe())">Delete</button>
      </div>
    </div>
  `,
  styles: ``,
})
export class Recipe {
  drawer = input.required<MatDrawer>();
  recipe = input.required<RecipeModel>();

  update = output<RecipeModel>();
  delete = output<RecipeModel>();
  copy = output<RecipeModel>();
}
