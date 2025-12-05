import { Pipe, PipeTransform } from '@angular/core';
import {UnitLabels} from '../../../shared/models/unit';
import {Ingredient} from '../models/ingredient';


@Pipe({ name: 'ingredientText' })
export class IngredientTextPipe implements PipeTransform {
  transform(value: Partial<Ingredient>): string {
    const name = value.product?.name ?? "Unknown";
    const unit = UnitLabels[value.unit!];
    const quantity = value.quantityRequired;

    return `${name} - ${quantity} ${unit}`;
  }
}
