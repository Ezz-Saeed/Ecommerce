import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent implements OnInit {

  breadCrumb$?:Observable<any[]>

  constructor(private breadCrumbService:BreadcrumbService){}

  ngOnInit(): void {
    this.breadCrumb$=this.breadCrumbService.breadcrumbs$;
  }



}
