import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../../shared/products.model';
import { ProductService } from '../../../shared/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<ProductModel[]> | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }

  borrarProducto(id: string) {
    this.productService.deleteProduct(id).subscribe(data => {
      console.log(data);
    });
  }
}
