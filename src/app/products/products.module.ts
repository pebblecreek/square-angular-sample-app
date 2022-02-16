import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
  ]
  
})
export class ProductsModule { }
