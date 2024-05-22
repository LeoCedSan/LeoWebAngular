import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from './products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BASE_URL = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<ProductModel[]>(`${this.BASE_URL}/products`);
  }

  getProduct(id: string) {
    return this.http.get<ProductModel>(`${this.BASE_URL}/products/${id}`);
  }

  addProduct(product: ProductModel) {
    return this.http.post<string>(`${this.BASE_URL}/products`, product);
  }

  updateProduct(product: ProductModel) {
    return this.http.put<string>(`${this.BASE_URL}/products/${product.id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete<string>(`${this.BASE_URL}/products/${id}`);
  }
}
