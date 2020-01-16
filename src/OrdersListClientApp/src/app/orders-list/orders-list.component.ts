import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { StatusesService } from '../services/statuses.service';
import { ProductsService } from '../services/products.service';
import { IOrderItem } from '../interfaces/iorderItem';
import { IOrder } from '../interfaces/iorder';
import { IProduct } from '../interfaces/iproduct';
import { IStatus } from '../interfaces/istatus';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],

  providers: []
})
export class OrdersListComponent implements OnInit {

  constructor(private orderService: OrdersService,
    private statusesService: StatusesService,
    private productsService: ProductsService,
    private modalService: NgbModal) { }

  orderItems: IOrderItem[] = [];
  products: IProduct[];
  statuses: IStatus[];
  orders: IOrder[];

  editableOrderId: number;
  editableProductId: number;
  editableStatusId: number;
  editableOrderCount: number;

  isEditMode = false;

  ngOnInit() {
    this.orderService.getOrders()
      .subscribe(data => {
        this.orders = data;

        this.statusesService.getStatuses()
          .subscribe(data => {
            this.statuses = data;
          });

        this.productsService.getProducts()
          .subscribe(data => {
            this.products = data;
          });

        for (var index in this.orders) {
          let product: IProduct;
          let status: IStatus;
          let item = this.orders[index];

          this.productsService.getProductById(item.productId)
            .subscribe(data => {
              product = data;
            });

          this.statusesService.getStatusById(item.statusId)
            .subscribe(data => {
              status = data;
              let orderItem: IOrderItem = {
                orderId: item.id,
                productId: product.id,
                productName: product.name,
                productPrice: product.price,
                productPhoto: product.photoUrl,
                count: item.count,
                statusId: status.id,
                statusName: status.name
              };

              this.orderItems.push(orderItem);
            });
        }
      });
  }

  onClickEdit(item: IOrderItem) {
    this.editableOrderId = item.orderId;
    this.editableProductId = item.productId;
    this.editableStatusId = item.statusId;
    this.editableOrderCount = item.count;

    this.isEditMode = true;
  }

  nameSelectSetter(id: string) {
    this.editableProductId = +id;
  }

  onClickCancel() {
    this.isEditMode = false;
  }
  onClickSave() {
    let order: IOrder = {
      id: this.editableOrderId,
      productId: this.editableProductId,
      statusId: this.editableStatusId,
      count: this.editableStatusId
    };

    this.orderService.updateOrder(order)
      .subscribe(data => {
        this.updateProduct(data);
      });

    this.isEditMode = false;
  }

  openModal(content: any, id: number) {
    this.modalService.open(content, { size: 'sm' })
      .result.then((result) => {
        this.onClickModal(result, id);
      });
  }

  private onClickModal(result: string, id: number) {
    if (result == 'Delete click') {
      this.orderService.deleteOrder(id)
        .subscribe(() => {
          let itemIndex = this.orderItems.findIndex(x => x.orderId == id)
          this.orderItems.splice(itemIndex, 1);
        });
    }
  }

  private updateProduct(item: IOrder) {
    let product: IProduct;
    let status: IStatus;


    this.productsService.getProductById(item.productId)
      .subscribe(data => {
        product = data;
      });

    this.statusesService.getStatusById(item.statusId)
      .subscribe(data => {
        status = data;
        let orderItem: IOrderItem = {
          orderId: item.id,
          productId: product.id,
          productName: product.name,
          productPrice: product.price,
          productPhoto: product.photoUrl,
          count: item.count,
          statusId: status.id,
          statusName: status.name
        };

        let itemIndex = this.orderItems.findIndex(x => x.orderId == item.id);
        this.orderItems[itemIndex] = orderItem;
      });
  }

  trackByFn(i: number) {
    return i;
  }
}