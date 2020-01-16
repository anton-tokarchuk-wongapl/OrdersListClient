import { Injectable, OnInit } from '@angular/core';
import  {HttpClient, HttpResponse } from '@angular/common/http';
import { IProduct } from '../interfaces/iproduct';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService
{   
    constructor(private httpClient: HttpClient) { }

    private url = 'api/products/';

    getProducts() : Observable<IProduct[]> {
        return this.httpClient.get<IProduct[]>(this.url);
    }

    getProductById(id: number) : Observable<IProduct> {
        return this.httpClient.get<IProduct>(this.url + id);
    }

    updateProduct(product: IProduct) : Observable<IProduct> {
        return this.httpClient.put<IProduct>(this.url, product);
    }

    deleteProduct(id: number) : Observable<IProduct> {
        return this.httpClient.delete<IProduct>(this.url + id);
    }
}