import { Injectable, OnInit } from '@angular/core';
import  {HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService implements OnInit
{
    public Products: ProductModel[];

    constructor(private httpClient: HttpClient) { }

    getProducts() : Observable<ProductModel[]> {
        console.log("hi from log");
        return this.httpClient.get<ProductModel[]>('api/products');
    }

    ngOnInit() {}
}