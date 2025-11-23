import {Component, signal} from '@angular/core';
import {Recipe} from '../models/recipe';
import {RecipeType} from '../models/recipe-type';

@Component({
  selector: 'app-recipe-form',
  imports: [],
  template: `
    <p>
      recipe-form works!
    </p>
  `,
  styles: ``,
})
export class RecipeForm {
  recipeModel = signal<Partial<Recipe>>({
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
}
