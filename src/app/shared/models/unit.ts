export enum Unit {
  grams,
  kilograms,
  millilitres,
  unit,
  teaspoon,
  tablespoon
}

export const UnitLabels: Record<Unit, string> = {
  [Unit.grams]: 'g',
  [Unit.kilograms]: 'kg',
  [Unit.millilitres]: 'ml',
  [Unit.unit]: 'unit',
  [Unit.teaspoon]: 'tsp',
  [Unit.tablespoon]: 'tbsp'
};
