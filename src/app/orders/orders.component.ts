import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/_services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[]= [];
  constructor(private orderService: OrderService) { 
    const sub = this.orderService.getOrders("LKEGVEGKRYY28", "R7TFE41VRN74HFH2NPH5ZTJFAC").subscribe(res => {
      this.orders = res.data.orders;
      sub.unsubscribe();
    })
  }

  ngOnInit(): void {
  }

}
