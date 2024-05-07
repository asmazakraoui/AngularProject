import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CommandLine } from 'src/app/models/ShopManag/CommandLine';
import { Orderr } from 'src/app/models/ShopManag/Orderr';


@Injectable({
  providedIn: 'root'
})
export class OrderrService {
  private baseUrl :string = 'http://localhost:8082/test';
  constructor(private http : HttpClient) { }
  
  findAllOrderrs(): Observable<Orderr[]>{
    return this.http.get<Orderr[]>( this.baseUrl + '/getAllOrders');
  }

  getLastOrderForUser():Observable<Orderr>{
    return this.http.get<Orderr>(this.baseUrl + '/getOrder');
  }

  getCommandLinesByOrder(idOrder: number):Observable<CommandLine[]>{
    return this.http.get<CommandLine[]>(`${this.baseUrl}/getCommandLineByOrder/${idOrder}`);
  }
  placeOrderr(total: number, discount: number, code: string): Observable<any> {
    console.log(total);
    console.log(discount);
    console.log(code);
    const url = `${this.baseUrl}/purchase`;
    const payload = { total, discount, code };
    return this.http.post(url, payload).pipe(
      catchError(error => {
        // Gérer les erreurs
        throw error;
      })
    );
  }
  
  updateStatusOrder(idOrder: number): Observable<any> {
    const url = `${this.baseUrl}/updateStatusOrder/${idOrder}`;
    return this.http.put<any>(url, null); 
  }


  deleteOrderr(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteOrder/${id}`);
  } 

  getAllOrdersSortedByDateAsc(): Observable<Orderr[]> {
    return this.http.get<Orderr[]>(`${this.baseUrl}/getAllOrdersSortedByDateAsc`);
  }

  getAllOrdersSortedByDateDesc(): Observable<Orderr[]> {
    return this.http.get<Orderr[]>(`${this.baseUrl}/getAllOrdersSortedByDateDesc`);
  }
}
