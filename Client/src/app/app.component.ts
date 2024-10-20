import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './Models/product';
import { NgFor } from '@angular/common';
import { IPagination } from './Models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  products:IProduct [] = [] as IProduct[];
  constructor(private http:HttpClient){}

  ngOnInit(): void {
   this.http.get<IPagination>('http://localhost:5098/api/Products?pageSize=50',).subscribe({
    next: pagination=>{
      this.products=pagination.data;
      console.log(pagination)
    },
    error: err=>console.log(err)
   })
  }

}
