import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  checkOutForm!:FormGroup;
  constructor(private fb:FormBuilder, private accountService:AccountService,
    private basketService:BasketService
  ){}
  ngOnInit(): void {
    this.createChecoutForm();
    this.getAddressValues();
    this.getDeliveryMethodValue();
  }

  createChecoutForm(){
    this.checkOutForm = this.fb.group({
      addressForm:this.fb.group({
        firstName:[null,Validators.required],
        lastName:[null,Validators.required],
        street:[null,Validators.required],
        city:[null,Validators.required],
        state:[null,Validators.required],
        zipCode:[null,Validators.required],
      }),
      deliveryForm:this.fb.group({
        deliveryMethod:[null,Validators.required]
      }),
      paymentForm:this.fb.group({
        nameOfCard:[null,Validators.required]
      })
    })
  }

  getAddressValues(){
    this.accountService.getUserAddress().subscribe({
      next:response=>{
        if(response){
          this.checkOutForm.get('addressForm')?.patchValue(response)
        }
      },
      error:err=>console.log(err)
    })
  }

  getDeliveryMethodValue(){
    const basket = this.basketService.getCurrentBasketValue();
    if(basket?.deliveryMethodId !== null){
      this.checkOutForm.get('deliveryForm')?.get('deliveryMethod')?.
      patchValue(basket?.deliveryMethodId?.toString())
    }
  }

}
