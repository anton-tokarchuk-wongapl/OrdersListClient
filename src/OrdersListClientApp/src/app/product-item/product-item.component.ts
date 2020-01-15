import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../services/products.service';
import { IProduct } from '../interfaces/iproduct';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],

  providers: [ProductsService]
})
export class ProductItemComponent implements OnInit {

  constructor(private productService: ProductsService, 
              private modalService: NgbModal) { }

  ngOnInit() {
  }

  @Input() id: number;
  @Input() name: string;
  @Input() price: number;
  @Input() photoUrl: string;

  @Output() onDeleted = new EventEmitter<number>();
    change(deleted:number) {
        this.onDeleted.emit(deleted);
    }

  editableName: string;
  editablePrice: number;

  editMode = false;

  onClickEdit() {
    this.editableName = this.name;
    this.editablePrice = this.price;
    this.editMode = true;
  }

  onClickCancel() {
    this.editableName = this.name;
    this.editablePrice = this.price;
    this.editMode = false;
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
        this.name = data.name;
        this.price = data.price;
    });
    this.editMode = false;
  }

  openModal(content) {
    this.modalService.open(content, { size: 'sm' })
    .result.then((result) => {
      this.onClickModal(result);
    });
  }

  private onClickModal(result: string) {
    if (result == 'Delete click')
    {
      this.productService.deleteProduct(this.id)
      .subscribe(() => {
        this.change(this.id);
      });
    }
  }
}
