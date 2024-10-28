import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPagination } from '../shared/Models/pagination';
import { IBrand } from '../shared/Models/brand';
import { IType } from '../shared/Models/productType';
import { ShopParams } from '../shared/Models/shopParams';
import { IProduct } from '../shared/Models/product';
import { Environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl:string = Environment.baseUrl;
  shopParams = new ShopParams();
  constructor(private http:HttpClient) { }

  getProducts(shopParams:ShopParams): Observable<IPagination>{
    let params = new HttpParams();
    if(shopParams.selectedBrandId !=0){
      params = params.append('brandId', shopParams.selectedBrandId.toString())
    }
    if(shopParams.selectedTypeID !=0){
      params= params.append('typeId', shopParams.selectedTypeID.toString())
    }

    if(shopParams.search){
      params = params.append('search', shopParams.search);
    }
      params=params.append('sort',shopParams.selectedSort);

      params = params.append('pageIndex',shopParams.pageNumber.toString())
      params = params.append('pageSize',shopParams.pageSize.toString())


    return this.http.get<IPagination>(`${this.baseUrl}products`,
      {observe:'response', params}).pipe(
        map(response=> response.body as IPagination)
      )
  }



  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getBrands():Observable<IBrand[]>{
    return this.http.get<IBrand[]>(`${this.baseUrl}products/brands`)
  }

  getTypes():Observable<IType[]>{
    return this.http.get<IType[]>(`${this.baseUrl}products/types`)
  }

  getProduct(id:number):Observable<IProduct>{
    return this.http.get<IProduct>(`${this.baseUrl}products/${id}`)
  }

}
