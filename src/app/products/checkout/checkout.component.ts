import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/_services/payment.service';
import { ScriptService } from 'src/_services/script.service';
declare var SqPaymentForm: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [ScriptService]
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  @ViewChild('payment-status-container', { static: false }) public paymentDiv: ElementRef;
  appId = 'sandbox-sq0idb-hXLs2Ohxeysy7kTPfUhOmQ';
  locationId = 'LKEGVEGKRYY28';
  card: any;
  constructor(private toastr: ToastrService, private router: Router, private script: ScriptService, public dialogRef: MatDialogRef<CheckoutComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private paymentService: PaymentService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.script.load('squarePaySDK').then(async res => {
      if (!(window as any).Square) {
        throw new Error('Square.js failed to load properly');
      }
      let payments = (window as any).Square.payments(this.appId, this.locationId);
      this.initializeCard(payments);
    }).catch(error => console.log(error));
  }

  initializeCard(payments: any) {
    payments.card().then((res: any) => {
      const card = res;
      card.attach('#card-container').then((res: any) => {
        this.card = card;
      });
    });
  }

  tokenize(paymentMethod: any) {
    paymentMethod.tokenize().then((res: any) => {
      console.log(res.status);
      if (res.status === 'OK') {
        this.paymentService.createPayment({ order_id: this.data.orderId, source_id: res.token, amount: this.data.amount, customer_id: 'R7TFE41VRN74HFH2NPH5ZTJFAC' }).subscribe(res => {
          console.log(res);
          this.dialogRef.close();
          localStorage.clear()
          this.toastr.success('Payment Successfull ', 'Congratulations')
          this.router.navigate(['/products'])
        });
      } else {
        let errorMessage = `Tokenization failed with status: ${res.status}`;
        if (res.errors) {
          errorMessage += ` and errors: ${JSON.stringify(
            res.errors
          )}`;
        }
        throw new Error(errorMessage);
      }
    });
  }

  onGetCardNonce(event: any) {
    event.preventDefault();
    this.tokenize(this.card);
    
  }


}
