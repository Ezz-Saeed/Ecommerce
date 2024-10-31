import { Injectable } from '@angular/core';
import { Environment } from '../Environments/environment';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { Basket, IBasket, IBasketItem } from '../shared/Models/basket';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../shared/Models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = `${Environment.baseUrl}basket`;
  // initialBasket:IBasket = new Basket();
  private basketSource = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private http:HttpClient) { }

  getBasket(id:string){
    return this.http.get<Basket>(`${this.baseUrl}?id=${id}`).
    pipe(
      map((basket:Basket)=>{
        this.basketSource.next(basket);
        console.log(this.getCurrentBasketValue());
      })
    );
  }

  setBasket(basket: Basket){
    return this.http.post<Basket>(this.baseUrl, basket).subscribe({
      next: response=>{
        this.basketSource.next(response)
        console.log(response)
      },
      error: err=>{
        console.log(err);
      }
    })
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity:number){
    const itemToAdd: IBasketItem = this.mapProductToBAsketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.creatBasket();
    basket.basketItems = this.addOrUpdateItem(basket.basketItems, itemToAdd, quantity);
    this.setBasket(basket);
  }



  addOrUpdateItem(basketItems: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const itemIndex = basketItems.findIndex(i=>i.id===itemToAdd.id);
    if(itemIndex===-1){
      itemToAdd.quantity=quantity;
      basketItems.push(itemToAdd);
    }else{
      basketItems[itemIndex].quantity += quantity;
    }
    return basketItems;
  }


  private creatBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basketId', basket.id);
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

}
