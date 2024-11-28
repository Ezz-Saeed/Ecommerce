
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  token = localStorage.getItem('token')
  constructor(private basketService:BasketService, private accountService:AccountService){}

  ngOnInit(): void {
    // this.lodaBasket();
    this.loadCurrnetUser();
    this.basketService.lodaBasket();
  }

  loadCurrnetUser(){
      this.accountService.loadCurrentUser(this.token).subscribe({
        next:response=>{
          console.log('Loaded user')

        },
        error:err=>{
          console.log(err)
        }
      })

  }


}
