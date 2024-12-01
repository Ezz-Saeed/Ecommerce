import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { Basket } from '../../shared/Models/basket';
import { FormGroup } from '@angular/forms';
import { IAddress } from '../../shared/Models/address';
import { IOrderToCreate } from '../../shared/Models/order';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import {loadStripe, Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement} from '@stripe/stripe-js'

// declare var Stripe:any;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss'
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  @Input() checkoutForm?:FormGroup
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  @ViewChild('cardCvc') cardCvcElement?: ElementRef;
  stripe?: Stripe | null;
  cardNumber!: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;
  cardErrors?:any;
  cardHandler = this.onCange.bind(this);
  // cardNumberComplete = false;
  // cardExpiryComplete = false;
  // cardCvcComplete = false;
  // loading = false;

  constructor(private  checkoutService:CheckoutService,
    private basketService:BasketService, private toastr:ToastrService, private router:Router){

  }
  ngOnDestroy(): void {
    this.cardCvc?.destroy();
    this.cardExpiry?.destroy();
    this.cardNumber?.destroy();
  }
  ngAfterViewInit(): void {
    loadStripe(`pk_test_51QQYS2FDUMd19t5RqhyQut0mKqgGWVFJTgX9Rdjxg
      Ojzt8tIW8jEOOCjWZwffiFfyGiXQEazZoDqCbiApLNRTVFW00w4QwIn9S`).then(stripe=>{
        this.stripe = stripe
        const elements = this.stripe?.elements();
        if(elements){
          this.cardNumber = elements.create('cardNumber');
          this.cardNumber.mount(this.cardNumberElement?.nativeElement)
          this.cardNumber.on('change',this.cardHandler)

          this.cardExpiry = elements.create('cardExpiry');
          this.cardExpiry.mount(this.cardExpiryElement?.nativeElement)
          this.cardExpiry.on('change',this.cardHandler)

          this.cardCvc = elements.create('cardCvc');
          this.cardCvc.mount(this.cardCvcElement?.nativeElement)
          this.cardCvc.on('change',this.cardHandler)
        }
      })
  }

  onCange({error}:any){
    if(error){
      this.cardErrors = error.message;
    }else{
      this.cardErrors = null;
    }
  }

  async submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) throw new Error('cannot get basket');
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe({
      next: order=>{
        if(basket.clientSecret){
          this.stripe?.confirmCardPayment( basket.clientSecret,{
            payment_method:{
              card:this.cardNumber,
              billing_details: this.checkoutForm?.get('paymentForm')?.get('nameOfCard')?.value
            }
          }).then(res=>{
            if(res.paymentIntent){
              console.log(res)
              this.toastr.success('Order submited successfully');
              this.basketService.deleteLocalBasket();
              this.basketService.lodaBasket();
              const nvavigationExtras:NavigationExtras = {state:order}
              this.router.navigate(['checkout/success'],nvavigationExtras)
            }else{
              this.toastr.error('Payment process failed')
             }
          })
        }else{
         this.toastr.error('Payment process failed')
        }


      },
      error:err=>{
        this.toastr.error(err.message);
        console.log(err)
      }
    });

  }


  getOrderToCreate(basket:Basket ): IOrderToCreate{
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value as IAddress;
    if(!deliveryMethodId || !shipToAddress)
      throw new Error('Somthing wrong happened');
    return{
      basketId:  basket?.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    }
  }

}
