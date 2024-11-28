import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../Environments/environment';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { IUser } from '../shared/Models/user';
import { IAddress } from '../shared/Models/address';
import { BasketService } from '../basket/basket.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = `${Environment.baseUrl}Account`
  private currentUserSource = new ReplaySubject<IUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient, private basketService:BasketService) { }

  // getcurrentUserValue(){
  //   return this.currentUserSource.value;
  // }

  loadCurrentUser(token:string | null){
    if(token===null){
      this.currentUserSource.next(null)
      return of();
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${token}`)
    return this.http.get<IUser>(`${this.baseUrl}`,{headers:headers}).pipe(
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  login(values:IUser){

    return this.http.post<IUser>(`${this.baseUrl}/login`,values).pipe(
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('token', user.token);
          localStorage.setItem('basketId', user.basketId);
          let b = this.basketService.lodaBasket();
          console.log('basket: '+ b)
          this.currentUserSource.next(user)
        }
      })
    )
  }


  register(values:IUser){
    let basket = this.basketService.creatBasket();
    values.basketId = basket.id
    return this.http.post<IUser>(`${this.baseUrl}/register`,values).pipe(
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('token',user.token)
          this.currentUserSource.next(user)
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('basketId');
    this.basketService.basketSource.next(null)
    this.currentUserSource.next(null);
  }

  emailExists(email:string){
    return this.http.get<boolean>(`${this.baseUrl}/emailExists`)
  }

  getUserAddress(){
    return this.http.get<IAddress>(`${this.baseUrl}/getAddress`)
  }

  updateUserAddress(address:IAddress){

    return this.http.put<IAddress>(`${this.baseUrl}/updateAddress`,address);
  }

}
