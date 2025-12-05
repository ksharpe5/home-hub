import {Component, inject, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialog,
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
import {FormControl, FormsModule, isFormControl, ReactiveFormsModule} from '@angular/forms';
import {ProductScanner} from './product-scanner';

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
    ReactiveFormsModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ data?.name ?? 'New Product' }}</h2>
    <mat-dialog-content>
      <button matButton (click)="activateScanner()">Use Scanner</button>
      <div class="grid grid-cols-2 gap-4 py-4">
        <mat-form-field class="compact-field col-span-2">
          <mat-label>Name</mat-label>
          <input matInput type="text" [formControl]="nameFormControl">
        </mat-form-field>

        <mat-form-field class="compact-field col-span-1">
          <mat-label>Default Quantity</mat-label>
          <input matInput type="number" [formControl]="defaultQuantityFormControl">
        </mat-form-field>

        <mat-form-field class="compact-field col-span-1">
          <mat-label>Unit</mat-label>
          <mat-select [formControl]="unitFormControl">
            @for (unit of unitTypes; track unit) {
              <mat-option [value]="unit">{{ unit | unit }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field class="compact-field col-span-2">
          <mat-label>Barcode Number</mat-label>
          <input matInput type="text" [formControl]="barcodeFormControl">
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
  private readonly dialog = inject(MatDialog);
  private readonly dialogRef = inject(MatDialogRef<ProductDialog>);

  nameFormControl = new FormControl('');
  unitFormControl = new FormControl(Unit.grams);
  defaultQuantityFormControl = new FormControl(0);
  barcodeFormControl = new FormControl('');

  constructor() {
    if (this.data !== undefined) {
      this.nameFormControl.setValue(this.data.name);
      this.unitFormControl.setValue(this.data.unit);
      this.defaultQuantityFormControl.setValue(this.data.defaultQuantity ?? 0);
      this.barcodeFormControl.setValue(this.data.barcode ?? '');
    }
  }

  activateScanner() {
    const scanner = this.dialog.open(ProductScanner, {});
    scanner.afterClosed().subscribe((result: string) => {
      if (result.length <= 0) return;

      this.barcodeFormControl.setValue(result);
    });
  }

  closeWithModel() {
    const product: Partial<Product> = {
      id: this.data?.id ?? undefined,
      name: this.nameFormControl.value ?? 'Unknown',
      unit: this.unitFormControl.value ?? Unit.grams,
      defaultQuantity: this.defaultQuantityFormControl.value ?? 0,
      barcode: this.barcodeFormControl.value ?? '',
      category: this.data?.category ?? undefined
    };

    this.dialogRef.close(product);
  }
}
