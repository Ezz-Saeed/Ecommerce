import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../Environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { IUser } from '../shared/Models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = `${Environment.baseUrl}Account`
  private currentUserSource = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient) { }

  login(values:any){
    return this.http.post<IUser>(`${this.baseUrl}/login`,values).pipe(
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('token', user.token)
          this.currentUserSource.next(user)
        }
      })
    )
  }


  register(values:any){
    return this.http.post<IUser>(`${this.baseUrl}/register`,values).pipe(
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('token',user.token)
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
  }

  emailExists(emsil:string){
    return this.http.get<boolean>(`${this.baseUrl}/emailExists`)
  }

}
