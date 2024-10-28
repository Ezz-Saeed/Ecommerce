import { Component } from '@angular/core';
import { Environment } from '../../Environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent {
  baseUrl:string=Environment.baseUrl;
  validationErrors:any;
  constructor(private http:HttpClient){}

  get404Error(){
    return this.http.get(`${this.baseUrl}products/2000`).subscribe({
      next: err=>{
        console.log(err)
      },
      error: err=>{
        console.log(err)
      }
    })
  }

  get500Error(){
    return this.http.get(`${this.baseUrl}buggy/servererror`).subscribe({
      next: err=>{
        console.log(err)
      },
      error: err=>{
        console.log(err)
      }
    })
  }

  get400Error(){
    return this.http.get(`${this.baseUrl}buggy/badrequest`).subscribe({
      next: err=>{
        console.log(err)
      },
      error: err=>{
        console.log(err)
      }
    })
  }

  get400ValidationError(){
    return this.http.get(`${this.baseUrl}buggy/badrequest/${'error'}`).subscribe({
      next: err=>{
        console.log(err)
      },
      error: err=>{
        console.log(err.errors)
        this.validationErrors = err.errors;
        console.log(this.validationErrors)
      }
    })
  }

}
