import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { PlantCardComponent } from '../../components/card-item/card-item.component';
import { GridComponent } from '../../components/grid/grid.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { Plant } from '../../models/plant.model';
import { PlantService } from '../../services/plant.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    PlantCardComponent,
    GridComponent,
    PaginatorComponent,
    LoaderComponent,
  ],
  providers: [PlantService],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('listAnimation', [
      transition(':enter', [
        query('card-item', [
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
export class HomePageComponent implements OnInit {
  plants = signal<Plant[]>([]);
  loading = signal(true);
  viewMode = signal<'cards' | 'table'>('cards');

  // --- Cards ---
  cardsPerPage = 10;
  currentCardPage = 0;
  currentCards: Plant[] = [];

  // --- Tabla (Grid) ---
  tablePageSize = 10;
  tablePageIndex = 0;
  currentTableData: Plant[] = [];

  constructor(private router: Router, private plantService: PlantService) {}

  ngOnInit(): void {
    this.plantService.getAllPlants().subscribe({
      next: (res) => {
        this.plants.set(res);
        this.updateCardsPage();
        this.updateTableData();
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  setView(mode: 'cards' | 'table') {
    this.viewMode.set(mode);
  }

  // --- Cards ---
  updateCardsPage() {
    const start = this.currentCardPage * this.cardsPerPage;
    const end = start + this.cardsPerPage;
    this.currentCards = this.plants().slice(start, end);
  }

  onCardPageChange(event: PageEvent) {
    this.cardsPerPage = event.pageSize;
    this.currentCardPage = event.pageIndex;
    this.updateCardsPage();
  }

  // --- Tabla / Grid ---
  updateTableData() {
    const start = this.tablePageIndex * this.tablePageSize;
    const end = start + this.tablePageSize;
    this.currentTableData = this.plants().slice(start, end);
  }

  onTablePageChange(event: PageEvent) {
    this.tablePageSize = event.pageSize;
    this.tablePageIndex = event.pageIndex;
    this.updateTableData();
  }

  goToDetail(id: number) {
    this.router.navigate(['/detail', id]);
  }
}
