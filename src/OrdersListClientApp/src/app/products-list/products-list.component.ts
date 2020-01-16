import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { IProduct } from '../interfaces/iproduct';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],

  providers: [ProductsService]
})
export class ProductsListComponent implements OnInit {

  constructor(private productService: ProductsService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(data => {
        this.products = data;
      });
  }

  products: IProduct[];

  editableId: number;

  editableName: string;

  editablePrice: number;

  editMode = false;

  onClickEdit(product: IProduct) {
    this.editableId = product.id
    this.editableName = product.name
    this.editablePrice = product.price;
    this.editMode = true;
  }

  onClickCancel() {
    this.editMode = false;
  }

  onClickSave(product: IProduct) {
    let item: IProduct = {
      id: product.id,
      name: this.editableName,
      price: this.editablePrice,
      photoUrl: product.photoUrl
    };

    this.productService.updateProduct(item)
      .subscribe(data => {
        this.editableName = data.name;
        this.editablePrice = data.price;
        this.updateProduct(data);
      });

    this.editMode = false;
  }

  openModal(content: any, id: number, index: number) {
    this.modalService.open(content, { size: 'sm' })
      .result.then((result) => {
        this.onClickModal(result, id, index);
      });
  }

  trackByFn(i: number) {
    return i;
}

  private updateProduct(product: IProduct) {
    let itemIndex = this.products.findIndex(item => item.id == product.id);
    this.products[itemIndex] = product;
  }

  private onClickModal(result: string, id: number, index: number) {
    if (result == 'Delete click') {
      this.productService.deleteProduct(id)
        .subscribe(() => {
          this.products.splice(index, 1);
        });
    }
  }
}