import { Injectable, OnInit } from '@angular/core';
import  {HttpClient, HttpResponse } from '@angular/common/http';
import { IProduct } from '../interfaces/iproduct';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService
{
    constructor(private httpClient: HttpClient) { }

    getProducts() : Observable<IProduct[]> {
        return this.httpClient.get<IProduct[]>('api/products');
    }

    getProductById(id: number) : Observable<IProduct> {
        return this.httpClient.get<IProduct>('api/products/' + id);
    }

    updateProduct(product: IProduct) : Observable<IProduct> {
        return this.httpClient.put<IProduct>('api/products', product);
    }

    deleteProduct(id: number) : Observable<IProduct> {
        return this.httpClient.delete<IProduct>('api/products/' + id);
    }
}