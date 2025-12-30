import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Plant } from '../../models/plant.model';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        query('tr', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate(
              '300ms ease-out',
              style({ opacity: 1, transform: 'translateY(0)' })
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class GridComponent {
  displayedColumns: string[] = ['id', 'common_name', 'family'];
  dataSource = new MatTableDataSource<Plant>();

  rowsCount = 0;

  @Input()
  set plants(value: Plant[]) {
    this.dataSource.data = value;
    this.rowsCount++;
  }

  @Output() rowClick = new EventEmitter<number>();

  onRowClick(id: number) {
    this.rowClick.emit(id);
  }
}
