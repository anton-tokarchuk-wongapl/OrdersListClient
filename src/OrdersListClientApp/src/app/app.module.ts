import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { HttpClientModule } from '@angular/common/http';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersService } from './services/orders.service';
import { StatusesService } from './services/statuses.service';
import { ProductsService } from './services/products.service';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    OrdersListComponent,
    ProductsListComponent
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [OrdersService, StatusesService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
