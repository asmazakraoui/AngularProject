import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Categorie, Product } from 'src/app/Models/ShopManag/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl :string = 'http://localhost:8082';
  constructor(private http : HttpClient) { }

  findAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>( this.baseUrl + '/getAllProducts');
  }

  addProduct(formData: FormData): Observable<Product>{
    return this.http.post<Product>(this.baseUrl + '/addProduct', formData);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteProduct/${id}`);
  }

  updateProduct(id:number, formData: FormData):Observable<any>{
    return this.http.put(this.baseUrl+ `/updateProduct/${id}`,formData);
  }

  getProductById(id:any):Observable<any>{
    return this.http.get(this.baseUrl + `/getAllProductById/${id}`);
  }
  
  updateQuantityProduct(idProduct: number, quantity: number): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/updateQuantityProduct/${idProduct}/${quantity}`, {});
  }  
  
  searchProduct(nomProduit: String):Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+`/searchProduct/${nomProduit}`);
  }
  filterProducts(minPrice: number, maxPrice: number, categories: Categorie[]): Observable<Product[]> {
    let params = new HttpParams();
    if (minPrice) params = params.set('minPrice', minPrice.toString());
    if (maxPrice) params = params.set('maxPrice', maxPrice.toString());
    if (categories && categories.length > 0) {
      const categoryValues = categories.map(category => category.valueOf()); // Obtenir les valeurs numériques des énumérations
      params = params.set('categories', categoryValues.join(',')); // Convertir les valeurs numériques en une seule chaîne de caractères séparée par des virgules
    }
    console.log(categories);
    return this.http.get<Product[]>(`${this.baseUrl}/filtrer`, { params });
  }

  getProductsSortedByPriceAscending(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/sortByPriceAscending`);
  }

  getProductsSortedByPriceDescending(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/sortByPriceDescending`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category/${category}`);
  }

  getCategoryStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/category-stats`);
  }

  getAverageRating(productId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${productId}/average-rating`);
  }

  getProductsByHigherAverageRating(): Observable<Product[]> {
    const url = `${this.baseUrl}/high-rated`; 
    return this.http.get<Product[]>(url);
  }

  getProductRatingStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/stats/product-ratings`);
  }
}
