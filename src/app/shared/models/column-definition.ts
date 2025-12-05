import {PipeTransform} from '@angular/core';

export enum ColumnDefinitionType {
  normal,
  date,
  rating,
  pipe,
  iconButton
}

export type ColumnDefinitionMap = Record<string, ColumnDefinition>;

export class ColumnDefinition {
  displayName: string;
  type: ColumnDefinitionType;
  pipe: (new (...args: any[]) => PipeTransform) | undefined;
  icon: string | undefined = undefined;
  buttonCallback: Function | undefined;

  constructor(displayName: string, options: ColumnDefinitionOptions = {}) {
    this.displayName = displayName;
    this.type = options.type ?? ColumnDefinitionType.normal;
    this.pipe = options.pipe ?? undefined;
    this.icon = options.icon ?? undefined;
    this.buttonCallback = options.buttonCallback ?? undefined;
  }
}

export type ColumnDefinitionOptions = {
  type?: ColumnDefinitionType;
  pipe?: new (...args: any[]) => PipeTransform;
  icon?: string;
  buttonCallback?: Function | undefined;
}
