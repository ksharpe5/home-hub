import { Pipe, PipeTransform } from '@angular/core';
import {Unit, UnitLabels} from '../models/unit';

@Pipe({ name: 'unit' })
export class UnitPipe implements PipeTransform {
  transform(value: Unit): string {
    return UnitLabels[value];
  }
}
