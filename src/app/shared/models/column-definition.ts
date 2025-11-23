export enum ColumnDefinitionType {
  normal,
  date,
  rating
}

export type ColumnDefinitionMap = Record<string, ColumnDefinition>;

export class ColumnDefinition {
  displayName: string;
  type: ColumnDefinitionType;

  constructor(displayName: string, options: ColumnDefinitionOptions = {}) {
    this.displayName = displayName;
    this.type = options.type ?? ColumnDefinitionType.normal;
  }
}

export type ColumnDefinitionOptions = {
  type?: ColumnDefinitionType;
}
