import {PipeTransform} from '@angular/core';

export enum ColumnDefinitionType {
  normal,
  date,
  rating,
  pipe
}

export type ColumnDefinitionMap = Record<string, ColumnDefinition>;

export class ColumnDefinition {
  displayName: string;
  type: ColumnDefinitionType;
  pipe: (new (...args: any[]) => PipeTransform) | undefined;

  constructor(displayName: string, options: ColumnDefinitionOptions = {}) {
    this.displayName = displayName;
    this.type = options.type ?? ColumnDefinitionType.normal;
    this.pipe = options.pipe ?? undefined;
  }
}

export type ColumnDefinitionOptions = {
  type?: ColumnDefinitionType;
  pipe?: new (...args: any[]) => PipeTransform;
}
