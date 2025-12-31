import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';
import { Plant } from '../../models/plant.model';
import { PlantService } from '../../services/plant.service';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatExpansionModule,
    LoaderComponent,
    MatIconModule,
  ],
  providers: [PlantService],
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  plant: Plant | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private plantService: PlantService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.plantService.getPlantById(id).subscribe({
        next: (res) => {
          this.plant = this.transformPlant(res);

          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  private transformPlant(item: any): Plant {
    return {
      id: item.id,
      common_name: item.common_name || '',
      scientific_name: item.scientific_name || '',
      family: item.family?.name || '',
      genus: item.genus?.name || '',
      bibliography: item.bibliography || '',
      author: item.author || '',
      status: item.status || '',
      synonyms: item.synonyms || [],
      image_url: item.image_url || '/plant-placeholder.jpg',
      year: item.year,
    };
  }
}
