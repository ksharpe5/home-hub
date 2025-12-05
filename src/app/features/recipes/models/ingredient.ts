import {Product} from '../../products/models/product';
import {Unit} from '../../../shared/models/unit';

export type Ingredient = {
  id: number,
  recipeId: number,
  product: Product,
  quantityRequired: number,
  unit: Unit,
  sequenceNumber: number
};
