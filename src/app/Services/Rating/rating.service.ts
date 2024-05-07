import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Rating } from 'src/app/models/ShopManag/Rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http:HttpClient) { }
  private baseUrl :string = 'http://localhost:8082/test';

  getAllRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.baseUrl+'/getAllRatingss');
  }

  rateProduct(productId: number, userId: number, stars: number): Observable<any> {
    const url = `${this.baseUrl}/addRating`;
    const payload = { productId, userId, stars };
    return this.http.post(url, payload).pipe(
      catchError(error => {
        // Gérer les erreurs
        throw error;
      })
    );
  }
  getAverageRatingForProduct(productId: number): Observable<number> {
    const url = `${this.baseUrl}/average/${productId}`;
    return this.http.get<number>(url);
  }
}
