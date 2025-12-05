import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {RecipeControls} from '../components/recipe-controls';
import {RecipeType} from '../models/recipe-type';
import {Recipe as RecipeModel} from '../models/recipe';
import {DataTable} from '../../../shared/components/data-table';
import {ColumnDefinition, ColumnDefinitionMap, ColumnDefinitionType} from '../../../shared/models/column-definition';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {Recipe} from '../components/recipe';
import {RecipeForm} from '../components/recipe-form';
import {RecipeTypePipe} from '../pipes/recipe-type';
import {enumValues} from '../../../shared/utils/enum-helpers';
import {RecipeService} from '../services/recipe';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmPrompt} from '../../../shared/components/confirm-prompt';

@Component({
  selector: 'app-recipes',
  imports: [
    MatSidenavModule,
    RecipeControls,
    DataTable,
    Recipe
  ],
  template: `
    <mat-drawer-container class="h-full" autosize>
      <mat-drawer
        #recipeDrawer
        mode="over"
        position="end"
        class="!w-9/12"
        [opened]="selectedRecipe() !== undefined"
        (closed)="selectedRecipe.set(undefined)"
      >
        @if (selectedRecipe() !== undefined) {
          <app-recipe
            [drawer]="recipeDrawer"
            [recipe]="selectedRecipe()!"
            (copy)="copyRecipe($event)"
            (update)="openRecipeDialog($event)"
            (delete)="deleteRecipe($event, recipeDrawer)"
          />
        }
      </mat-drawer>
      <mat-drawer-content>
        <app-recipe-controls
          (addClicked)="openRecipeDialog()"
          (searchChanged)="currentSearchFilter.set($event)"
          (recipeTypesChanged)="currentTypesFilter.set($event)"
        />

        <app-data-table
          [showLoading]="recipeService.showLoading()"
          [tableData]="filteredRecipes()"
          [columnDefinition]="columnDefinition"
          (rowClicked)="selectedRecipe.set($event)"
        />
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: ``,
})
export default class Recipes {
  readonly recipeService = inject(RecipeService);
  readonly dialog = inject(MatDialog);
  readonly columnDefinition: ColumnDefinitionMap = {
    type: new ColumnDefinition('Type', { type: ColumnDefinitionType.pipe, pipe: RecipeTypePipe }),
    name: new ColumnDefinition('Name'),
    serves: new ColumnDefinition('Serves'),
    duration: new ColumnDefinition('Duration (minutes)'),
    effortRating: new ColumnDefinition("Effort", { type: ColumnDefinitionType.rating }),
    tasteRating: new ColumnDefinition("Taste", { type: ColumnDefinitionType.rating }),
    healthyRating: new ColumnDefinition("Healthy", { type: ColumnDefinitionType.rating }),
  };

  currentSearchFilter = signal<string>('');
  currentTypesFilter = signal<RecipeType[]>(enumValues(RecipeType));
  filteredRecipes = computed(() => {
    const recipes = this.recipeService.recipes();

    const words = this.currentSearchFilter()
      .toLowerCase()
      .split(' ')
      .filter(w => w.length > 0);

    return recipes.filter(recipe => {
      const activeType = this.currentTypesFilter().includes(recipe.type);
      return words.every(word => recipe.name.toLowerCase().includes(word)) && activeType;
    });
  });

  selectedRecipe = signal<RecipeModel | undefined>(undefined);

  openRecipeDialog(recipe: RecipeModel | undefined = undefined) {
    const form = this.dialog.open(RecipeForm, {
      data: recipe,
      minWidth: '90vw',
      disableClose: true,
      autoFocus: false,
    });
    form.afterClosed().subscribe((result: Partial<RecipeModel> | undefined) => {
      if (result === undefined) return;

      recipe === undefined ?
        this.recipeService.create(result) :
        this.recipeService.update(result);
    });
  }

  copyRecipe(recipe: RecipeModel) {
    this.recipeService.copy(recipe);
  }

  deleteRecipe(recipe: RecipeModel, drawer: MatDrawer) {
    const prompt = this.dialog.open(ConfirmPrompt);
    prompt.afterClosed().subscribe((result: boolean) => {
      if (!result) return;

      this.recipeService.delete(recipe);
      drawer.close().then();
    });
  }
}
