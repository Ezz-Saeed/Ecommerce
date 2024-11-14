import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup

  constructor(private accountService:AccountService){

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm = new FormGroup({
      email:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    })
  }

  onSbmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next:response=>{
        console.log('loggedin successfully')
      },
      error:err=>{
        console.log(err)
      }
    })
  }

}
