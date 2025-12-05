import {RecipeType} from './recipe-type';
import {Instruction} from './instruction';
import {Ingredient} from './ingredient';

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
  instructions: Instruction[],
}
