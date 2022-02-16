import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderService } from 'src/_services/order.service';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];
  variationIds: any[] = [];
  constructor(@Inject(PLATFORM_ID) private platformId: any, private dialog: MatDialog, private orderService: OrderService) {
    if (isPlatformBrowser(this.platformId)) {
      const items: any = localStorage.getItem('cart');
      this.cartItems = JSON.parse(items)
    }
  }
  ngOnInit(): void {
  }

  orderSum() {
    return this.cartItems.map(tag => tag.price).reduce((a, b) => a + b, 0);
  }

  getCatalogVariation() {
    this.variationIds = [];
    this.cartItems.forEach(el => {
      this.variationIds.push(el.variationId);
    })
  }

  checkout() {
    this.getCatalogVariation();
    const sub = this.orderService.createOrder({ customer_id: 'R7TFE41VRN74HFH2NPH5ZTJFAC', variation_id: this.variationIds }).subscribe(res => {
      if(res.data){
        this.openDialog(res.data.order.id);
      }
      sub.unsubscribe();
    })
  }

  openDialog(order_id: string) {
    const DialogRef = this.dialog.open(CheckoutComponent, {
      data: { orderId: order_id, amount: this.orderSum()},
      width: '50%',
      minHeight: '70%',
      disableClose: true
    });
    const sub = DialogRef.afterClosed().subscribe((res) => {
      sub.unsubscribe();
    });
  }
}
