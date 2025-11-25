export enum Unit {
  grams,
  kilograms,
  millilitres,
  unit
}

export const UnitLabels: Record<Unit, string> = {
  [Unit.grams]: 'g',
  [Unit.kilograms]: 'kg',
  [Unit.millilitres]: 'ml',
  [Unit.unit]: 'unit',
};
