import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Plant } from '../../models/plant.model';

@Component({
  selector: 'card-item',
  standalone: true,
  imports: [MatCardModule, RouterLink],
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class PlantCardComponent {
  @Input({ required: true }) plant!: Plant;
}
