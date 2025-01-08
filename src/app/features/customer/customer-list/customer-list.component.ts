import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCustomers } from '../../store/customers.selectors';
import { Observable } from 'rxjs';
import { AllCustomers } from '../../models/customer';
import { AsyncPipe } from '@angular/common';
import { CustomCardComponent } from "../../../shared/components/custom-card/custom-card.component";
import { CustomerActions } from '../../store/customers.action';

@Component({
  selector: 'crm-customer-list',
  imports: [
    AsyncPipe,
    CustomCardComponent,
],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerListComponent {
  customers$!:Observable<{customers:AllCustomers[], totalRecords:number}>;

  constructor(
    private store:Store,
  ){}

  ngOnInit(){
    this.store.dispatch(CustomerActions.loadCustomers());
    this.customers$=this.store.select(selectCustomers);
  }
}
