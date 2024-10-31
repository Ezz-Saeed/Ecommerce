
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  constructor(private basketService:BasketService){}

  ngOnInit(): void {

    const basketID = localStorage.getItem('basketId');
    if(basketID){
      this.basketService.getBasket(basketID).subscribe({
        next: response=>{
          console.log('initialized basket')
        },
        error:err=>{
          console.log(err);
        }
      })
    }

  }

}
