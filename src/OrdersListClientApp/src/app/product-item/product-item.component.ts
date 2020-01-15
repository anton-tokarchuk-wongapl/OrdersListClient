import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { IProduct } from '../interfaces/iproduct';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],

  providers: [ProductsService]
})
export class ProductItemComponent implements OnInit {

  constructor(private productService: ProductsService) { }

  ngOnInit() {
  }

  @Input() id: number;
  @Input() name: string;
  @Input() price: number;
  @Input() photoUrl: string;

  editableName: string;
  editablePrice: number;

  editMode = false;

  onClickEdit() {
    this.editableName = this.name;
    this.editablePrice = this.price;
    this.editMode = true;
  }

  onClickSave() {
    let product: IProduct = {
      id : this.id,
      name: this.editableName,
      price: this.editablePrice,
      photoUrl: this.photoUrl
    }

    this.productService.updateProduct(product)
    .subscribe(data => {
        console.log(data);
        this.name = data.name;
        this.price = data.price;
        console.log(this.name, this.price);
    });
    this.editMode = false;
  }

  cancelEdit() {

  }
}
