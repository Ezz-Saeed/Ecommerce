import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup

  constructor(private accountService:AccountService, private router:Router){

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm = new FormGroup({
      email:new FormControl('',[Validators.required,
        Validators.pattern('^[\\w\\.=-]+@[\\w\\.-]+\.[\\w]{2,3}$')]),
      password:new FormControl('',Validators.required)
    })
  }

  onSbmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next:response=>{
        this.router.navigateByUrl('/shop')
      },
      error:err=>{
        console.log(err)
      }
    })
  }

}
