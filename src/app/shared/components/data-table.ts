import {Component, input, OnInit, output, viewChild, computed} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {DatePipe, NgClass, UpperCasePipe} from '@angular/common';
import {ColumnDefinitionMap, ColumnDefinitionType} from '../models/column-definition';
import {RangePipe} from '../pipes/range';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-data-table',
  imports: [
    MatTableModule,
    MatSort,
    MatSortHeader,
    MatPaginator,
    NgClass,
    DatePipe,
    UpperCasePipe,
    RangePipe,
    MatIconModule,
  ],
  template: `
    <table mat-table [dataSource]="dataSource" matSort class="table">
      @for (columnId of columnKeys(); track columnId) {
        <ng-container [matColumnDef]="columnId">
          <!-- Header Cell -->
          @switch (columnDefs()[columnId].type) {
            @default {
              <th mat-header-cell *matHeaderCellDef mat-sort-header>
                {{ columnDefs()[columnId].displayName }}
              </th>
            }
          }

          @switch (columnDefs()[columnId].type) {
            @case (ColumnDefinitionType.normal) {
              <td mat-cell *matCellDef="let row">
                {{ row[columnId] }}
              </td>
            }

            @case (ColumnDefinitionType.date) {
              <td mat-cell *matCellDef="let row">
                {{ row[columnId] | date:'ddMMMyy - HH:mm' | uppercase }}
              </td>
            }

            @case (ColumnDefinitionType.rating) {
              <td mat-cell *matCellDef="let row">
                @for (index of (row[columnId] | range); track index) {
                    <mat-icon class="!text-yellow-400">star</mat-icon>
                }
              </td>
            }

            @default {
              <td mat-cell *matCellDef="let row">
                {{ row[columnId] }}
              </td>
            }
          }
        </ng-container>
      }
      <tr mat-header-row *matHeaderRowDef="columnKeys(); sticky: true"></tr>
      <tr mat-row *matRowDef="let row; columns: columnKeys()"
          (click)="rowClicked.emit(row)">
      </tr>
    </table>

    <mat-paginator [pageSizeOptions]="pageSizes()"
                   [showFirstLastButtons]="true"
                   [ngClass]="{'invisible': dataSource.data.length <= pageSizes()[0]}">
    </mat-paginator>
  `,
})
export class DataTable implements OnInit {
  readonly ColumnDefinitionType = ColumnDefinitionType;

  columnDefinition = input.required<ColumnDefinitionMap>();
  tableData = input.required<any[]>();
  pageSizes = input<number[]>([10, 25, 50]);
  filter = input<string>();

  columnDefs = computed(() => this.columnDefinition());
  columnKeys = computed(() => Object.keys(this.columnDefinition()));

  rowClicked = output<any>();

  dataSource = new MatTableDataSource<any>();

  sort = viewChild(MatSort);
  paginator = viewChild(MatPaginator);

  ngOnInit() {
    this.dataSource.data = this.tableData();
    this.dataSource.sort = this.sort();
    this.dataSource.paginator = this.paginator();
  }
}
