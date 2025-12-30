import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Plant } from '../models/plant.model';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private apiBase = '/api/plants';
  private token = 'usr-uOK2w39NmRhn62eAC8BVJvCGfjazecKj6bf6HdD4sBU';

  constructor(private http: HttpClient) {}

  // Trae una página de plantas
  getPlantsPage(page: number, perPage: number = 100): Observable<Plant[]> {
    const params = new HttpParams()
      .set('token', this.token)
      .set('page', page)
      .set('page_size', perPage);

    return this.http
      .get<any>(this.apiBase, { params })
      .pipe(map((res) => res.data.map(this.transformPlant)));
  }

  // Trae todas las plantas usando varias páginas
  getAllPlants(
    perPage: number = 100,
    totalPages: number = 5
  ): Observable<Plant[]> {
    const requests: Observable<Plant[]>[] = [];
    for (let page = 1; page <= totalPages; page++) {
      requests.push(this.getPlantsPage(page, perPage));
    }
    return forkJoin(requests).pipe(map((pages) => pages.flat()));
  }

  getPlantById(id: string | number): Observable<Plant> {
    return this.http
      .get<any>(`${this.apiBase}/${id}?token=${this.token}`)
      .pipe(map((res) => this.transformPlant(res.data)));
  }

  private transformPlant(item: any): Plant {
    return {
      id: item.id,
      common_name: item.common_name || '',
      scientific_name: item.scientific_name || '',
      family: item.family || '',
      genus: item.genus || '',
      bibliography: item.bibliography || '',
      author: item.author || '',
      status: item.status || '',
      synonyms: item.synonyms || [],
      image_url: item.image_url,
      year: item.year,
    };
  }
}
