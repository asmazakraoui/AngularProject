import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommandLine } from 'src/app/models/ShopManag/CommandLine';
import { Product } from 'src/app/models/ShopManag/Product';
import { ProductInfo } from 'src/app/models/ShopManag/ProductInfo';

@Injectable({
  providedIn: 'root'
})
export class CommandLineService {

  private baseUrl :string = 'http://localhost:8082/test';
  private cartItemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public cartItems$: Observable<Product[]> = this.cartItemsSubject.asObservable();

  constructor(private http : HttpClient) { }

  findAllCommandLines(): Observable<CommandLine[]>{
    return this.http.get<CommandLine[]>( this.baseUrl + '/getAllCommandLines');
  }
  
  addCommandLine(commandLine: CommandLine): Observable<CommandLine>{
    return this.http.post<CommandLine>(this.baseUrl + '/addCommandLine', commandLine);
  } 

  

  deleteCommandLine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteCommandLine/${id}`);
  }

  addToCart(product: Product, userId: number): Observable<CommandLine> {
    return this.http.post<CommandLine>(`${this.baseUrl}/addToCart/${userId}`, product);
  }

  getCart(userId: number): Observable<ProductInfo[]> {
    console.log("test1");
    return this.http.get<ProductInfo[]>(`${this.baseUrl}/getCart/${userId}`);
  }
  getProductsSortedByPriceAsc(): Observable<ProductInfo[]> {
    return this.http.get<ProductInfo[]>(`${this.baseUrl}/sort-by-price-asc`);
  }

  getProductsSortedByPriceDesc(): Observable<ProductInfo[]> {
    return this.http.get<ProductInfo[]>(`${this.baseUrl}/sort-by-price-desc`);
  }
  
  updateQuantity(quantity: number, idCart: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateQuantity/${quantity}/${idCart}`, null).pipe(
      catchError((error) => {
        console.error('Une erreur est survenue :', error);
        throw error;
      })
    );
  }
  updateCommandLine(id:number, commandLine: CommandLine):Observable<CommandLine>{
    return this.http.put<CommandLine>(`${this.baseUrl}/updateCommandLine/${id}`, commandLine );
  }

  updateCart( productInfo: ProductInfo): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateCart`, productInfo);
  }

  getProductByCommandLine(id: number):Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/getProductByCommandLine/${id}`);
  }
 
}
