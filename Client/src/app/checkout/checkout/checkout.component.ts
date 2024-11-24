import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  checkOutForm!:FormGroup;
  constructor(private fb:FormBuilder){}
  ngOnInit(): void {
    this.createChecoutForm();
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

}
