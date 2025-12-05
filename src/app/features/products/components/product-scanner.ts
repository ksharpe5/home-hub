import {Component, inject} from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import {BarcodeFormat} from '@zxing/library';
import {MatDialogModule, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {ProductDialog} from './product-dialog';

@Component({
  selector: 'app-product-scanner',
  imports: [
    ZXingScannerModule,
    MatDialogTitle,
    MatDialogModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Scanner</h2>
    <mat-dialog-content>
      <zxing-scanner (scanSuccess)="scanned($event)" [formats]="formats"></zxing-scanner>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styles: ``,
})
export class ProductScanner {

  formats = Object.values(BarcodeFormat).filter(value => typeof value === 'number') as number[];
  readonly dialogRef = inject(MatDialogRef<ProductScanner>);

  scanned(result: string) {
    this.dialogRef.close(result);
  }

}
