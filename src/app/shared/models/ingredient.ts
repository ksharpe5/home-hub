import {Unit} from './unit';

export type Ingredient = {
  id: number,
  recipeId: number,
  name: string,
  quantity: number,
  unit: Unit
}
