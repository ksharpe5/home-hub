import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {Product} from '../models/product';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {Unit} from '../../../shared/models/unit';
import {MatSelectModule} from '@angular/material/select';
import {UnitPipe} from '../../../shared/pipes/unit';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-dialog',
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    UnitPipe,
    FormsModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ data?.name ?? 'New Product' }}</h2>
    <mat-dialog-content>
      <button matButton (click)="activateScanner()">Use Scanner</button>
      <div class="grid grid-cols-2 gap-4 py-4">
        <mat-form-field class="compact-field col-span-2">
          <mat-label>Name</mat-label>
          <input matInput type="text" [(ngModel)]="name">
        </mat-form-field>

        <mat-form-field class="compact-field col-span-1">
          <mat-label>Default Quantity</mat-label>
          <input matInput type="number" [(ngModel)]="defaultQuantity">
        </mat-form-field>

        <mat-form-field class="compact-field col-span-1">
          <mat-label>Unit</mat-label>
          <mat-select [(ngModel)]="unit">
            @for (unit of unitTypes; track unit) {
              <mat-option [value]="unit">{{ unit | unit }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field class="compact-field col-span-2">
          <mat-label>Barcode Number</mat-label>
          <input matInput type="text" [(ngModel)]="barcode">
        </mat-form-field>
      </div>

    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton [matDialogClose]="undefined">Cancel</button>
      <button matButton="filled" (click)="closeWithModel()">Update</button>
    </mat-dialog-actions>
  `,
  styles: ``,
})
export class ProductDialog {
  readonly Unit = Unit;
  readonly unitTypes = Object.values(Unit)
    .filter(value => typeof value === 'number');

  data: Product | undefined = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<ProductDialog>);

  name: string = '';
  unit: Unit = Unit.grams;
  defaultQuantity: number = 0;
  barcode: string = '';

  constructor() {
    if (this.data !== undefined) {
      this.name = this.data.name;
      this.unit = this.data.unit;
      this.defaultQuantity = this.data.defaultQuantity ?? 0;
      this.barcode = this.data.barcode ?? '';
    }
  }

  activateScanner() {

  }

  closeWithModel() {
    const product: Partial<Product> = {
      id: this.data?.id ?? undefined,
      name: this.name,
      unit: this.unit,
      defaultQuantity: this.defaultQuantity,
      barcode: this.barcode,
      category: this.data?.category ?? undefined
    };

    this.dialogRef.close(product);
  }
}
