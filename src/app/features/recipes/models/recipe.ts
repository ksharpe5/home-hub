import {RecipeType} from './recipe-type';
import {Ingredient} from '../../../shared/models/ingredient';

export type Recipe = {
  id: number,
  name: string,
  type: RecipeType,
  serves: number,
  duration: number,
  tasteRating: number,
  effortRating: number,
  healthyRating: number,
  ingredients: Ingredient[],
  instructions: string[]
}
