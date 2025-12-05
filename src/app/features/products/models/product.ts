import {Unit} from '../../../shared/models/unit';

export type Product = {
  id: number,
  name: string,
  defaultQuantity?: number,
  unit: Unit,
  barcode?: string,
  category?: string
};
