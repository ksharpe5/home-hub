import { Pipe, PipeTransform } from '@angular/core';
import {RecipeType} from '../models/recipe-type';

@Pipe({ name: 'recipe-type' })
export class RecipeTypePipe implements PipeTransform {
  transform(value: RecipeType): string {
    const name = RecipeType[value];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
