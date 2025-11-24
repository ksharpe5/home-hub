export enum Unit {
  grams,
  kilograms,
  millilitres
}

export const UnitLabels: Record<Unit, string> = {
  [Unit.grams]: 'g',
  [Unit.kilograms]: 'kg',
  [Unit.millilitres]: 'ml',
};
