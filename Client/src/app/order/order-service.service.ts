import { Injectable } from '@angular/core';
import { Environment } from '../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../shared/Models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = `${Environment.baseUrl}Orders`
  constructor(private http:HttpClient) { }

  getOrders(){
    return this.http.get<IOrder[]>(this.baseUrl)
  }

  getOrderById(id:number){
    return this.http.get<IOrder>(`${this.baseUrl}/${id}`)
  }
}
