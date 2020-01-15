import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { IProduct } from '../interfaces/iproduct';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],

  providers: [ProductsService]
})
export class ProductsListComponent implements OnInit {
  public Products: IProduct[];
  
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getProducts()
    .subscribe(data => {
      this.Products = data;
    });
  }
}
