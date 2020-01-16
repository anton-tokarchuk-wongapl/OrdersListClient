import { Injectable, OnInit } from '@angular/core';
import  {HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStatus } from '../interfaces/istatus';

@Injectable()
export class StatusesService
{
    constructor(private httpClient: HttpClient) { }

    private url = 'api/statuses/';

    getStatuses() : Observable<IStatus[]> {
        return this.httpClient.get<IStatus[]>(this.url);
    }

    getStatusById(id: number) : Observable<IStatus> {
        return this.httpClient.get<IStatus>(this.url + id);
    }

    updateStatus(product: IStatus) : Observable<IStatus> {
        return this.httpClient.put<IStatus>(this.url, product);
    }

    deleteStatus(id: number) : Observable<IStatus> {
        return this.httpClient.delete<IStatus>(this.url + id);
    }
}