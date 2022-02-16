import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[]= [];
  constructor(@Inject(PLATFORM_ID) private platformId: any,) { 
    if (isPlatformBrowser(this.platformId)) {
      const items:any = localStorage.getItem('cart');
      this.cartItems = JSON.parse(items)
    }
  }
  
  ngOnInit(): void {
  }

}
