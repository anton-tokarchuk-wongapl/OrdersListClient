import { Injectable, OnInit } from '@angular/core';
import  {HttpClient, HttpResponse } from '@angular/common/http';
import { ProductModel } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService
{
    Products: ProductModel[] = [];

    constructor(private httpClient: HttpClient) { }

    getProducts() : Observable<ProductModel[]> {
        return this.httpClient.get<ProductModel[]>('api/products');
    }

    getProductById(id: number) : Observable<ProductModel> {
        return this.httpClient.get<ProductModel>('api/products/' + id);
    }
}