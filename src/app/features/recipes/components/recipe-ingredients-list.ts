import {Component, input} from '@angular/core';
import {Ingredient} from '../models/ingredient';
import {UnitPipe} from '../../../shared/pipes/unit';

@Component({
  selector: 'app-recipe-ingredients-list',
  imports: [
    UnitPipe
  ],
  template: `
    <h2 class="font-bold mb-2">Ingredients</h2>
    <ul class="list-disc">
      @for (ingredient of ingredients(); track ingredient.id) {
        <li>{{ ingredient.product.name }} - {{ ingredient.quantityRequired }} {{ ingredient.unit | unit }}</li>
      }
    </ul>
  `,
  styles: ``,
})
export class RecipeIngredientsList {
  ingredients = input.required<Ingredient[]>();
}
