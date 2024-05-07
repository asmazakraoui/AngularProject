import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promotion } from 'src/app/models/ShopManag/Promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private baseUrl :string = 'http://localhost:8082/test';
  constructor(private http : HttpClient) { }

  addPromotion(promotion: Promotion): Observable<Promotion>{
    return this.http.post<Promotion>(this.baseUrl + '/addPromotion', promotion);
  }

  findAllPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>( this.baseUrl + '/getAllPromotions');
  }

  updatePromotion(id:number, promotion:Promotion):Observable<any>{
    console.log("update");
    return this.http.put(this.baseUrl+ `/updatePromotion/${id}`,promotion);
  }

  deletePromotion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletePromotion/${id}`);
  }
  getPromotionById(id:any):Observable<any>{
    return this.http.get(this.baseUrl + `/getPromotionById/${id}`);
  }

  Discount(code: string, total: number): Observable<number> {
    console.log(code);
    console.log(total);
    const params = new HttpParams().set('code', code).set('total', total.toString());
    return this.http.get<number>(`${this.baseUrl}/discount`, {params});
  }
}
