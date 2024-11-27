import { Component, Input } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { Basket } from '../../shared/Models/basket';
import { FormGroup } from '@angular/forms';
import { IAddress } from '../../shared/Models/address';
import { IOrderToCreate } from '../../shared/Models/order';
import { firstValueFrom } from 'rxjs';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss'
})
export class CheckoutPaymentComponent {
  @Input() checkoutForm?:FormGroup

  constructor(private  checkoutService:CheckoutService,
    private basketService:BasketService, private toastr:ToastrService){

  }

  async submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) throw new Error('cannot get basket');
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe({
      next: res=>{
        this.toastr.success('Order submited successfully');
        this.basketService.deleteLocalBasket();
        console.log(res)
      },
      error:err=>{
        this.toastr.error(err.message);
        console.log(err)
      }
    });

  }

  // private  createOrder(basket: Basket | null) {
  //   if (!basket) throw new Error('Basket is null');
  //   const orderToCreate = this.getOrderToCreate(basket);
  //   this.checkoutService.createOrder(orderToCreate).subscribe({
  //     next:res=>{
  //       console.log(res)
  //     },
  //     error:err=>console.log(err),
  //   });
  // }

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
