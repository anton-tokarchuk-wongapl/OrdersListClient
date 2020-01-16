import { Injectable, OnInit } from '@angular/core';
import  {HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../interfaces/iorder';

@Injectable()
export class OrdersService
{
    constructor(private httpClient: HttpClient) { }

    private url = 'api/orders/';

    getOrders() : Observable<IOrder[]> {
        return this.httpClient.get<IOrder[]>(this.url);
    }

    getOrderById(id: number) : Observable<IOrder> {
        return this.httpClient.get<IOrder>(this.url + id);
    }

    updateOrder(product: IOrder) : Observable<IOrder> {
        return this.httpClient.put<IOrder>(this.url, product);
    }

    deleteOrder(id: number) : Observable<IOrder> {
        return this.httpClient.delete<IOrder>(this.url + id);
    }

    createOrder(order: IOrder) : Observable<IOrder> {
        return this.httpClient.post<IOrder>(this.url, order);
    }
}