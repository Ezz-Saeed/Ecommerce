import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IPagination, Pagination } from '../shared/Models/pagination';
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
  products:IProduct[] = [];
  brands?:IBrand[];
  types?:IType[];
  pagination = new Pagination();
  numOfPagesReceived = 0;
  constructor(private http:HttpClient) { }

  getProducts(useCash = true): Observable<IPagination>{
    if(useCash===false){
      this.products = []
      console.log("false")
    }
    if(this.products.length>0 &&useCash===true){
      this.numOfPagesReceived = Math.ceil(this.products.length/this.shopParams.pageSize);

      if(this.shopParams.pageNumber<=this.numOfPagesReceived){
        this.pagination.data = this.products.
        slice((this.shopParams.pageNumber-1)*this.shopParams.pageSize,
              this.shopParams.pageNumber*this.shopParams.pageSize)
        return of(this.pagination);
      }
    }

    let params = new HttpParams();
    if(this.shopParams.selectedBrandId !=0){
      params = params.append('brandId', this.shopParams.selectedBrandId.toString())
    }
    if(this.shopParams.selectedTypeID !=0){
      params= params.append('typeId', this.shopParams.selectedTypeID.toString())
    }

    if(this.shopParams.search){
      params = params.append('search', this.shopParams.search);
    }
      params=params.append('sort',this.shopParams.selectedSort);

      params = params.append('pageIndex',this.shopParams.pageNumber.toString())
      params = params.append('pageSize',this.shopParams.pageSize.toString())


    return this.http.get<IPagination>(`${this.baseUrl}products`,
      {observe:'response', params}).pipe(
        map(response=> {
          this.products = [...this.products,...response.body!.data]
          // console.log(this.products)
          this.pagination = response.body!;
          return this.pagination;
        })
      )
  }



  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getBrands():Observable<IBrand[]>{
    if(this.brands && this.brands?.length>0)
      return of(this.brands);
    return this.http.get<IBrand[]>(`${this.baseUrl}products/brands`).pipe(
      map(res=>{
        this.brands = res;
        return res
      })
    )
  }

  getTypes():Observable<IType[]>{
    if(this.types && this.types.length>0)
      return of(this.types);
    return this.http.get<IType[]>(`${this.baseUrl}products/types`).pipe(
      map(res=>{
        this.types=res;
        return res;
      })
    )
  }

  getProduct(id:number):Observable<IProduct>{
    const product = this.products?.find(p=>p.id===id);
    if(product)
      return of(product)
    return this.http.get<IProduct>(`${this.baseUrl}products/${id}`)
  }

}
