import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductModel } from '../models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],

  providers: [ProductsService]
})
export class ProductsListComponent implements OnInit {
  public Products: ProductModel[];
  
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getProducts()
    .subscribe(data => {
      for (let item of data)
      {
        this.Products.push(item);
      }
      // this.Products = data;  
    });
  }
}
