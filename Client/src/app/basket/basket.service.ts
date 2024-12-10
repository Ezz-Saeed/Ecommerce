import { Injectable } from '@angular/core';
import { Environment } from '../Environments/environment';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/Models/basket';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../shared/Models/product';
import { IDeliveryMethod } from '../shared/Models/deliveryMethod';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = `${Environment.baseUrl}basket`;
   basketSource = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalsSource = new BehaviorSubject<IBasketTotals | null>(null);
  basketTotlas$ = this.basketTotalsSource.asObservable();
  shipping = 0;

  constructor(private http:HttpClient) { }

  setShippingPrice(delivetMethod: IDeliveryMethod){
    this.shipping = delivetMethod.price;
    const basket = this.getCurrentBasketValue();
    if(basket){
      basket.deliveryMethodId = delivetMethod.id;
      basket.shippingPrice = delivetMethod.price;
    }

    this.calcBasketTotals();
    this.setBasket(basket)
  }

  createPaymentIntent(){
    return this.http.post<IBasket>(`${Environment.baseUrl}Payment/${this.getCurrentBasketValue()?.id}`,
    {}).pipe(
      map((basket:IBasket)=>{
        this.basketSource.next(basket)
        console.log(this.getCurrentBasketValue())
      })
    )
  }

  deleteLocalBasket() {
    this.basketSource.next(null);
    this.basketTotalsSource.next(null);
  }

  getBasket(id:string){
    return this.http.get<IBasket>(`${this.baseUrl}?id=${id}`).
    pipe(
      map((basket:IBasket)=>{
        this.basketSource.next(basket);
        this.shipping = basket.shippingPrice ?? 0;
        this.calcBasketTotals();
      })
    );
  }

  setBasket(basket: IBasket | null){
    return this.http.post<Basket>(this.baseUrl, basket).subscribe({
      next: response=>{
        this.basketSource.next(response)
        this.calcBasketTotals();
      },
      error: err=>{
        console.log(err);
      }
    })
  }

  public creatBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basketId', basket.id);
    this.setBasket(basket);
    return basket;
  }

  private mapProductToBAsketItem(item: IProduct, quantity:number): IBasketItem {
    return{
      id:item.id,
      productName:item.name,
      price:item.price,
      quantity:quantity,
      pictureUrl:item.pictureUrl,
      type: item.productType,
      brand:item.productBrand
    };
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity:number){
    const itemToAdd: IBasketItem = this.mapProductToBAsketItem(item, quantity);
    const basket = this.getCurrentBasketValue();
    if(!basket)
      throw new Error('Null basket')
    console.log(this.getCurrentBasketValue)
    basket.basketItems = this.addOrUpdateItem(basket.basketItems, itemToAdd, quantity);
    this.setBasket(basket);
  }

  incrementItemQuantity(item:IBasketItem){
    const basket= this.getCurrentBasketValue()!;
    const itemIndex = basket.basketItems.findIndex(i=>i.id===item.id);
    basket.basketItems[itemIndex].quantity+=1;
    this.setBasket(basket);
  }

  decrementItemQuantity(item:IBasketItem){
    const basket= this.getCurrentBasketValue()!;
    const itemIndex = basket.basketItems.findIndex(i=>i.id===item.id);
    if(basket.basketItems[itemIndex].quantity > 1){
      basket.basketItems[itemIndex].quantity-=1;
      this.setBasket(basket);
    }else{
      this.removeItemFromBAsket(item);
    }

  }
  removeItemFromBAsket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if(basket?.basketItems.find(i=>i.id===item.id)){
      basket.basketItems = basket.basketItems.filter(i=>i.id!==item.id)
      if(basket.basketItems.length>0){
        this.setBasket(basket);
      }
      else{
        this.removeBasket(basket);
        this.lodaBasket();
      }
    }
  }
  removeBasket(basket: IBasket) {
    return this.http.delete(`${this.baseUrl}?id=${basket.id}`).subscribe({
      next: response=>{
        this.basketSource.next(null);
        this.basketTotalsSource.next(null);
        localStorage.removeItem("basketId");
      },
      error:err=>{
        console.log(err);
      }
    })
  }



  private calcBasketTotals(){
    const basket = this.getCurrentBasketValue();
      const shipping= this.shipping;
      const subTotal= basket?.basketItems.reduce((a,b)=>(b.price*b.quantity+a),0);
      const total= shipping + (subTotal ?? 0);
      this.basketTotalsSource.next({shipping,subTotal,total})
  }

  private addOrUpdateItem(basketItems: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const itemIndex = basketItems.findIndex(i=>i.id===itemToAdd.id);
    if(itemIndex===-1){
      itemToAdd.quantity=quantity;
      basketItems.push(itemToAdd);
    }else{
      basketItems[itemIndex].quantity += quantity;
    }
    return basketItems;
  }

  updateUserBasketId(id:string){
    return this.http.put<string>(`${this.baseUrl}/upadtebasketid/${id}`,{}).subscribe({
      next: response=>{
        localStorage.setItem('basketId',response);
        console.log(response)
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  lodaBasket(){
    const basketID = localStorage.getItem('basketId');
    if(basketID){
      this.getBasket(basketID).subscribe({
        next: response=>{
          console.log('initialized basket')
        },
        error:err=>{
          console.log(err);
        }
      })
    }else{
      let basket = this.creatBasket();
      this.updateUserBasketId(basket.id);
      this.getBasket(basket.id).subscribe({
        next:res=>{
          console.log(res)
        },
        error:err=>console.log(err)
      })
    }
  }
}
