import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {
  @Input() length = 0; // total items
  @Input() pageSize = 20; // items por página
  @Input() pageSizeOptions = [5, 10, 20];

  @Output() pageChanged = new EventEmitter<PageEvent>();
}
