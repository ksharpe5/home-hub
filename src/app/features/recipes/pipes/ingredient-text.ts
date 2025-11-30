import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from '../../../shared/models/ingredient';
import {UnitLabels} from '../../../shared/models/unit';


@Pipe({ name: 'ingredientText' })
export class IngredientTextPipe implements PipeTransform {
  transform(value: Partial<Ingredient>): string {
    if (
      value.unit === undefined ||
      value.name === undefined ||
      value.quantity === undefined) return "Unknown Ingredient";

    const unitText = UnitLabels[value.unit];
    return `${value.name} - ${value.quantity}${unitText}`;
  }
}
