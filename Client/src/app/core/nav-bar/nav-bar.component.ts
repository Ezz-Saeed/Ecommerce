import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { Basket, IBasket } from '../../shared/Models/basket';
import { IUser } from '../../shared/Models/user';
import { AccountService } from '../../account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  basket$!:Observable<IBasket | null>
  currentUser$!:Observable<IUser | null>
  constructor(private basketService:BasketService, private accountService:AccountService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.basket$ = this.basketService.basket$
    this.currentUser$ = this.accountService.currentUser$;
  }


  logOut(){
    this.router.navigateByUrl('/account/login')
    this.accountService.logout();
  }
}
