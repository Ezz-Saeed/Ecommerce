import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, of, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  registerForm!:FormGroup;
  errors?:string[];

  constructor(private accountService:AccountService, private router:Router,
    private fb:FormBuilder
  ){

  }
  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      email:['',[Validators.required,Validators.pattern('^[\\w\\.=-]+@[\\w\\.-]+\.[\\w]{2,3}$')],
    [this.validateEmailInUse]],
      displayName:[null,[Validators.required]],
      password:[null,[Validators.required]]
    })
  }


  onSbmit(){
    this.accountService.register(this.registerForm.value).subscribe({
      next:respinse=>{
        this.router.navigate(['/shop'])
      },
      error:err=>{
        console.log(err);
        this.errors = err.errors;
      }
    })
  }

  validateEmailInUse(): AsyncValidatorFn{
    return control=>{
      return timer(5000).pipe(
        switchMap(()=>{
          if(!control){
            return of(null)
          }else{
            return this.accountService.emailExists(control.value).pipe(
              map(response=>{
                return response ? {emailExists: true} : null;
              })
            )
          }
        })
      )
    }
  }

}
