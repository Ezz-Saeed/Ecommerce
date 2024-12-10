import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/Models/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/Models/brand';
import { IType } from '../shared/Models/productType';
import { ShopParams } from '../shared/Models/shopParams';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  products!:IProduct[];
  brands!:IBrand[];
  types!:IType[];
  shopParams!:ShopParams;
  totalCount:number = 0;
  numberOfPages:number =  0;
  pagesArray = new Array();
  @ViewChild('search',{static:false}) search!:ElementRef;
  // search!:ElementRef;

  sortOptions=[
    {name:'Alphabetical', value:'name'},
    {name:'Price: low to high', value:'priceAsc'},
    {name:'Price: high to low', value:'priceDesc'},

  ]

  constructor(private shopService:ShopService){
    this.shopParams = shopService.getShopParams();
  }

  ngOnInit(): void {

    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  getProducts(useCash = false){

    this.shopService.getProducts(useCash).subscribe({
      next: response=>{
        this.products = response.data
        // this.shopParams.pageNumber = response.pageIndex
        // this.shopParams.pageSize = response.pageSize
        // this.totalCount = response.count
        if(useCash){
          this.totalCount = this.shopService.products.length;
          this.numberOfPages =
          Math.ceil(this.shopService.pagination.count/this.shopService.pagination.pageSize)
        }else{
          this.totalCount = response.count
          this.numberOfPages =  Math.ceil(((response.count)/(response.pageSize)));
        }
        this.pagesArray.length=this.numberOfPages
      },
      error: error=>{
        console.log(error);
      }
    });

  }


  onPageChanges(page:number){
    const params = this.shopService.getShopParams();
    params.pageNumber = page;
    this.shopService.setShopParams(params);
    this.getProducts(true);
  }

  getBrands(){
    this.shopService.getBrands().subscribe({
      next: data=>{
        this.brands = [{id:0, name:'All'}, ...data]
      },
      error: error=>{
        console.log(error);
      }
    });
  }


  getTypes(){
    this.shopService.getTypes().subscribe({
      next: data=>{
        this.types = [{id:0, name:"All"}, ...data]
      },
      error: error=>{
        console.log(error);
      }
    });
  }

  onselectedBrandIdChanges(selectedBrandId:number){
    const params = this.shopService.getShopParams();
    params.selectedBrandId = selectedBrandId;
    params.pageNumber = 1
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onselectedTypeIdChanges(selectedTypeId:number){
    const params = this.shopService.getShopParams();
    params.selectedTypeID = selectedTypeId;
    params.pageNumber = 1
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onSortChange(event:Event){
    const params = this.shopService.getShopParams();
    let ele = event.target as HTMLSelectElement
    params.selectedSort = ele.value;
    this.shopService.setShopParams(params);
    this.getProducts();
  }


  onSearch(){
    const params = this.shopService.getShopParams();
    params.search= this.search?.nativeElement.value;
    params.pageNumber=1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onReset(){
    this.search.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }

  // onPreviousPage(){
  //   if(this.shopParams.pageNumber>1){
  //     this.shopParams.pageNumber-=1;
  //   }
  //   this.getProducts();
  // }

  // onNextPage(){
  //   if(this.shopParams.pageNumber!==this.numberOfPages){
  //     this.shopParams.pageNumber+=1;
  //   }

  //   this.getProducts();
  // }

  // onPageChanged(event: any) {
  //   const params = this.shopService.getShopParams();
  //   if (params.pageNumber !== event) {
  //     params.pageNumber = event;
  //     this.shopService.setShopParams(params);
  //     this.shopParams = params;
  //     this.getProducts();
  //   }
  // }

}
