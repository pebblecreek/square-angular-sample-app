import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PaymentService } from 'src/_services/payment.service';
import { ScriptService } from 'src/_services/script.service';
declare var SqPaymentForm: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [ScriptService]
})
export class CheckoutComponent implements OnInit {
  appId = 'sandbox-sq0idb-hXLs2Ohxeysy7kTPfUhOmQ';
  locationId = 'LKEGVEGKRYY28';
  card: any;
  source_id: any = {};
  paymentForm: any;
  constructor(private router: Router, private script: ScriptService, public dialogRef: MatDialogRef<CheckoutComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private paymentService: PaymentService) {
    this.script.load('squarePay').then(res => {
      this.paymentForm = new SqPaymentForm({
        applicationId: this.appId,
        locationId: this.locationId,
        inputClass: 'sq-input',
        autoBuild: false,
        inputStyles: [{
          fontSize: '16px',
          lineHeight: '24px',
          padding: '16px',
          placeholderColor: '#a0a0a0',
          backgroundColor: 'transparent',
        }],
        cardNumber: {
          elementId: 'sq-card-number',
          placeholder: 'Card Number'
        },
        cvv: {
          elementId: 'sq-cvv',
          placeholder: 'CVV'
        },
        expirationDate: {
          elementId: 'sq-expiration-date',
          placeholder: 'MM/YY'
        },
        postalCode: {
          elementId: 'sq-postal-code',
          placeholder: 'Postal'
        },
        callbacks: {
          cardNonceResponseReceived: function (errors: any, nonce: any, cardData: any, billingContact: any, shippingContact: any, shippingOption: any) {
            if (errors) {
              // Log errors from payment token generation to the browser developer console.
              console.error('Encountered errors:');
              errors.forEach(function (error: any) {
                console.error('  ' + error.message);
              });
              console.log('Encountered errors, check browser developer console for more details');
              return;
            }
            paymentService.createPayment({ order_id: data.orderId, source_id: nonce, amount: data.amount, customer_id: 'R7TFE41VRN74HFH2NPH5ZTJFAC' }).subscribe(res => {
              console.log(res);
            });
          }
        }
      });
      // //TODO: paste code from step 1.1.5
      this.paymentForm.build();
    }).catch(error => console.log(error));
  }

  ngOnInit() {
  }

  onGetCardNonce(event: any) {
    // Don't submit the form until SqPaymentForm returns with a payment token
    event.preventDefault();
    // Request a payment token from the SqPaymentForm object
    this.paymentForm.requestCardNonce();
    this.dialogRef.close();
    localStorage.clear()
    this.router.navigate(['/products'])
  }


}
