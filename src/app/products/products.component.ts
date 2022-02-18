import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/_services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  cart: any[]= [];
  constructor(private productService: ProductService, private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    const sub = this.productService.getProducts().subscribe(res => {
      this.products = res.data.objects;
      sub.unsubscribe();
    })
  }

  goToCart(product: any) {
    const item: any = {};
    item['image'] = product.images[0].image_data.url
    item['name'] = product.item_data.name;
    item['quantity'] = 1;
    item['price'] = product.item_data.variations[0].item_variation_data.price_money.amount;
    item['variationId'] = product.item_data.variations[0].id
    this.cart.push(item);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.toastr.success('Added to Cart Successfully', 'Success')
  }

}


