import * as uuid from 'uuid'

export interface IBasket {
  id: string
  basketItems: IBasketItem[]
  paymentIntentId?:string
  clientSecret?:string
  deliveryMethodId?:number
  shippingPrice?:number
}

export interface IBasketItem {
  id: number
  productName: string
  price: number
  quantity: number
  pictureUrl: string
  brand: string
  type: string
}

export class Basket implements IBasket {
  id: string= uuid.v4();
  basketItems: IBasketItem[] = []

}


export interface IBasketTotals{
  shipping:number;
  subTotal:number | undefined;
  total:number;
}
