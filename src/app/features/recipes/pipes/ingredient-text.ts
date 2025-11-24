import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from '../../../shared/models/ingredient';
import {UnitLabels} from '../../../shared/models/unit';


@Pipe({ name: 'ingredientText' })
export class IngredientTextPipe implements PipeTransform {
  transform(value: Ingredient): string {
    const unitText = UnitLabels[value.unit];
    return `${value.name} - ${value.quantity}${unitText}`;
  }
}
