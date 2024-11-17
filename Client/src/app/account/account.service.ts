import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getcurrentUserValue(){
    return this.currentUserSource.value;
  }

  loadCurrentUser(token:string){
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
          this.currentUserSource.next(user)
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
  }

  emailExists(email:string){
    return this.http.get<boolean>(`${this.baseUrl}/emailExists`)
  }

}
