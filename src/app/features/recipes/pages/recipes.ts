import {Component, signal} from '@angular/core';
import {RecipeControls} from '../components/recipe-controls';
import {RecipeType} from '../models/recipe-type';
import {Recipe as RecipeModel} from '../models/recipe';
import {DataTable} from '../../../shared/components/data-table';
import {ColumnDefinition, ColumnDefinitionMap, ColumnDefinitionType} from '../../../shared/models/column-definition';
import {MatSidenavModule} from '@angular/material/sidenav';
import {Recipe} from '../components/recipe';
import {MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RecipeForm} from '../components/recipe-form';

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
        <app-recipe-form/>
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
          (searchChanged)="updateSearchFilter($event)"
          (recipeTypesChanged)="updateTypesFilter($event)"
        />

        <app-data-table
          [tableData]="SAMPLE_DATA"
          [columnDefinition]="columnDefinition"
          (rowClicked)="selectedRecipe.set($event)"
        />
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: ``,
})
export default class Recipes {
  SAMPLE_DATA: RecipeModel[] = [
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
        "Chop Chicken",
        "Add Rice",
        "Add Stock",
        "Cook the stuff",
        "Nom the stuff",
        "Chop Chicken",
        "Add Rice",
        "Add Stock",
        "Cook the stuff",
        "Nom the stuff",
        "Chop Chicken",
        "Add Rice",
        "Add Stock",
        "Cook the stuff",
        "Nom the stuff",
        "Chop Chicken",
        "Add Rice",
        "Add Stock",
        "Cook the stuff",
        "Nom the stuff",
        "Chop Chicken",
        "Add Rice",
        "Add Stock",
        "Cook the stuff",
        "Nom the stuff",
        "Chop Chicken",
        "Add Rice",
        "Add Stock",
        "Cook the stuff",
        "Nom the stuff"
      ],
      ingredients: [
        { id: 0, name: "Chicken", quantity: 200, unit: "g" },
        { id: 0, name: "Chorizo", quantity: 100, unit: "g" },
        { id: 0, name: "Paella Rice", quantity: 350, unit: "g" },
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
        "Chop Chicken",
        "Add Rice",
        "Add Stock",
        "Cook the stuff",
        "Nom the stuff"
      ],
      ingredients: [
        { id: 0, name: "Chicken", quantity: 200, unit: "g" },
        { id: 0, name: "Chorizo", quantity: 100, unit: "g" },
        { id: 0, name: "Paella Rice", quantity: 350, unit: "g" },
      ]
    }
  ];
  readonly columnDefinition: ColumnDefinitionMap = {
    type: new ColumnDefinition('Type'),
    name: new ColumnDefinition('Name'),
    serves: new ColumnDefinition('Serves'),
    duration: new ColumnDefinition('Duration (minutes)'),
    effortRating: new ColumnDefinition("Effort", { type: ColumnDefinitionType.rating }),
    tasteRating: new ColumnDefinition("Taste", { type: ColumnDefinitionType.rating }),
    healthyRating: new ColumnDefinition("Healthy", { type: ColumnDefinitionType.rating }),
  };

  selectedRecipe = signal<RecipeModel | undefined>(undefined);

  addRecipe() {

  }

  updateSearchFilter(value: string) {

  }

  updateTypesFilter(types: RecipeType[]) {

  }
}
