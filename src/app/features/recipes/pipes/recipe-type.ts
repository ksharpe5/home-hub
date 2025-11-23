import { Pipe, PipeTransform } from '@angular/core';
import {RecipeType} from '../models/recipe-type';

@Pipe({
  name: 'recipe-type',
  standalone: true
})
export class RecipePipe implements PipeTransform {
  transform(value: RecipeType): string {
    const name = RecipeType[value];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
