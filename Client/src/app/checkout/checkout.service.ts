import { Injectable } from '@angular/core';
import { Environment } from '../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IDeliveryMethod } from '../shared/Models/deliveryMethod';
import { IOrderToCreate } from '../shared/Models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = `${Environment.baseUrl}Orders/`

  constructor(private http:HttpClient) { }

  getDelivryMethods(){
    return this.http.get<IDeliveryMethod[]>(`${this.baseUrl}getDeliveryMethods`,)

  }

  createOrder(order:IOrderToCreate){
    return this.http.post(`${this.baseUrl}`,order);
  }
}
