import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllCustomers, Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { Pagination } from '../../shared/models/common';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private httpClient:HttpClient
  ) { }

  addCustomer(customer:Customer){
    return this.httpClient.post('/customer/add-customer', customer);
  }
  
  getCustomers(pagination:Pagination):Observable<{customers:AllCustomers[], totalRecords:number}>{

    const params=new HttpParams()
      .set('page', pagination.page)
      .set('pagesize', pagination.pagesize)
      .set('searchterm', pagination.searchterm || '');

    return this.httpClient.get<{customers:AllCustomers[], totalRecords:number}>
      ('/customer/all-customers', {
        params
      });
  }
}
