import { Component, Input, OnInit } from '@angular/core';
import { IDeliveryMethod } from '../../shared/Models/deliveryMethod';
import { CheckoutService } from '../checkout.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss'
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input()checkoutForm!:FormGroup;
  deliveryMethods!:IDeliveryMethod[];
  constructor(private checkoutService:CheckoutService) {}
  ngOnInit(): void {
    this.checkoutService.getDelivryMethods().subscribe({
      next:response=>{
        this.deliveryMethods = response
      },
      error:err=>console.log(err)
    })
  }

}
