import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ProductModel } from '../models/product.model';

@Injectable
export class ProductsService
{
    private url = "http"
    constructor(private httpClient: HttpClient) { }

    

    getProducts() : ProductModel[] {
        return this.httpClient.get<ProductModel[]>("");
    }
}