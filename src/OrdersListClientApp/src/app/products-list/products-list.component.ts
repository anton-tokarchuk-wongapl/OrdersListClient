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

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getProducts()
    .subscribe(data => {
      this.products = data;
    });
  }

  products: IProduct[];

  onDeleted(deleted: number) {
    console.log(deleted);
    this.deleteProduct(deleted);
  }

  private deleteProduct(id: number) {
    let item = this.products.find(i => i.id === id);
    console.log(item);
    let index = this.products.indexOf(item, 0);
    console.log(index);
    this.products.slice(index, 1);
  }
}
