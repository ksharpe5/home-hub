import {Component, input, output} from '@angular/core';
import {Recipe as RecipeModel} from '../models/recipe';
import {MatIconModule} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDrawer} from '@angular/material/sidenav';
import {UnitPipe} from '../../../shared/pipes/unit';

@Component({
  selector: 'app-recipe',
  imports: [
    MatIconModule,
    MatIconButton,
    MatButton,
    UnitPipe
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
        <div class="flex-[3] border rounded-2xl p-4 overflow-auto">
          <h2 class="font-bold mb-2">Instructions</h2>
          <ol class="list-decimal space-y-1">
            @for (instruction of recipe().instructions; track $index) {
              <li>{{ instruction.text }}</li>
            }
          </ol>
        </div>

        <!-- Ingredients -->
        <div class="flex-[1] border rounded-2xl p-4 overflow-auto">
          <h2 class="font-bold mb-2">Ingredients</h2>
          <ul class="space-y-1">
            @for (ingredient of recipe().ingredients; track $index) {
              <li>{{ ingredient.quantity }}{{ ingredient.unit | unit }} {{ ingredient.name }}</li>
            }
          </ul>
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
