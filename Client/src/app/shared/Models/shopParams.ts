

export class ShopParams{
  selectedBrandId: number = 0;
  selectedTypeID:number = 0;
  selectedSort:string = 'name';
  pageNumber:number = 1;
  pageSize:number = 6;
  search?:string;
}