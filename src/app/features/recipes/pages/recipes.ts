import {Component, computed, signal} from '@angular/core';
import {RecipeControls} from '../components/recipe-controls';
import {RecipeType} from '../models/recipe-type';
import {Recipe as RecipeModel} from '../models/recipe';
import {DataTable} from '../../../shared/components/data-table';
import {ColumnDefinition, ColumnDefinitionMap, ColumnDefinitionType} from '../../../shared/models/column-definition';
import {MatSidenavModule} from '@angular/material/sidenav';
import {Recipe} from '../components/recipe';
import {RecipeForm} from '../components/recipe-form';
import {Unit} from '../../../shared/models/unit';
import {RecipeTypePipe} from '../pipes/recipe-type';
import {enumValues} from '../../../shared/utils/enum-helpers';

@Component({
  selector: 'app-recipes',
  imports: [
    MatSidenavModule,
    RecipeControls,
    DataTable,
    Recipe,
    RecipeForm,
  ],
  template: `
    <mat-drawer-container class="h-full" autosize>
      <mat-drawer
        #addDrawer
        mode="over"
        position="start"
        class="!w-9/12"
      >
        <app-recipe-form [drawer]="addDrawer"/>
      </mat-drawer>
      <mat-drawer
        #recipeDrawer
        mode="over"
        position="end"
        class="!w-9/12"
        [opened]="selectedRecipe() !== undefined"
        (closed)="selectedRecipe.set(undefined)"
      >
        @if (selectedRecipe() !== undefined) {
          <app-recipe [drawer]="recipeDrawer" [recipe]="selectedRecipe()!"/>
        }
      </mat-drawer>
      <mat-drawer-content>
        <app-recipe-controls
          (addClicked)="addDrawer.open()"
          (searchChanged)="currentSearchFilter.set($event)"
          (recipeTypesChanged)="currentTypesFilter.set($event)"
        />

        <app-data-table
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
  readonly SAMPLE_DATA: RecipeModel[] = [
    {
      id: 0,
      name: "Paella",
      type: RecipeType.Food,
      duration: 30,
      effortRating: 2,
      healthyRating: 3,
      tasteRating: 5,
      serves: 3,
      instructions: [
        { id: 0, text: 'Cook the stuff' },
        { id: 0, text: 'Cook the stuff' },
        { id: 0, text: 'Cook the stuff' },
        { id: 0, text: 'Cook the stuff' },
      ],
      ingredients: [
        { id: 0, name: "Chicken", quantity: 200, unit: Unit.grams },
        { id: 0, name: "Chorizo", quantity: 100, unit: Unit.grams },
        { id: 0, name: "Paella Rice", quantity: 350, unit: Unit.grams },
      ]
    },
    {
      id: 1,
      name: "Steak",
      type: RecipeType.Food,
      duration: 15,
      effortRating: 1,
      healthyRating: 4,
      tasteRating: 2,
      serves: 2,
      instructions: [
        { id: 0, text: 'Cook the stuff' },
        { id: 0, text: 'Cook the stuff' },
        { id: 0, text: 'Cook the stuff' },
        { id: 0, text: 'Cook the stuff' },
      ],
      ingredients: [
        { id: 0, name: "Chicken", quantity: 200, unit: Unit.grams },
        { id: 0, name: "Chorizo", quantity: 100, unit: Unit.grams },
        { id: 0, name: "Paella Rice", quantity: 350, unit: Unit.grams },
      ]
    },
    {
      id: 0,
      name: "Doughnuts",
      type: RecipeType.Snack,
      duration: 30,
      effortRating: 2,
      healthyRating: 3,
      tasteRating: 5,
      serves: 3,
      instructions: [
        { id: 0, text: 'Cook the stuff' },
        { id: 0, text: 'Cook the stuff' },
        { id: 0, text: 'Cook the stuff' },
        { id: 0, text: 'Cook the stuff' },
      ],
      ingredients: [
        { id: 0, name: "Chicken", quantity: 200, unit: Unit.grams },
        { id: 0, name: "Chorizo", quantity: 100, unit: Unit.grams },
        { id: 0, name: "Paella Rice", quantity: 350, unit: Unit.grams },
      ]
    },
    {
      id: 0,
      name: "Espresso Martini",
      type: RecipeType.Drink,
      duration: 30,
      effortRating: 2,
      healthyRating: 3,
      tasteRating: 5,
      serves: 3,
      instructions: [
        { id: 0, text: 'Cook the stuff' },
        { id: 0, text: 'Cook the stuff' },
        { id: 0, text: 'Cook the stuff' },
        { id: 0, text: 'Cook the stuff' },
      ],
      ingredients: [
        { id: 0, name: "Chicken", quantity: 200, unit: Unit.grams },
        { id: 0, name: "Chorizo", quantity: 100, unit: Unit.grams },
        { id: 0, name: "Paella Rice", quantity: 350, unit: Unit.grams },
      ]
    }
  ];
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
    const recipes = this.SAMPLE_DATA;

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
}
