import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';

Injectable()
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  if(token){
    const newReq = req.clone({
      setHeaders:{
        Authorization:`Bearer ${token}`
      }
    })
    return next(newReq);
  }

  return next(req);
};
