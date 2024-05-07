import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from 'src/app/models/ShopManag/Delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private baseUrl :string = 'http://localhost:8082/test';
  constructor(private http : HttpClient) { }

  addDelivery(deliveryDto: any): Observable<any>{
    return this.http.post(this.baseUrl + '/addDelivery', deliveryDto);
  }

  getDelivery(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${this.baseUrl}/getAllDeliverys`);
  }

  setDeliveryAccepted(idDelivery: number, idUser: number): Observable<Delivery> {
    return this.http.put<Delivery>(`${this.baseUrl}/delivery/${idDelivery}/accept/${idUser}`, null);
  }

  getAllDeliveriesAccepted(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${this.baseUrl}/accepted`);
  }

  setDeliveryDone(idDelivery: number): Observable<Delivery> {
    return this.http.put<Delivery>(`${this.baseUrl}/deliverydone/${idDelivery}`, {});
  }

  getAllDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${this.baseUrl}/getAllDeliveriesBack`);
  }

  searchDeliveries(searchDelivery: string): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${this.baseUrl}/deliveriesSearch/${searchDelivery}`);
  }
  
  getDeliveryStatsByGovernorate(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/stats/by-governorate`);
  }

}
