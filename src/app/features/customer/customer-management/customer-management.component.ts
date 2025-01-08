import { Component, DestroyRef, inject } from '@angular/core';
import { CustomerFormComponent } from "../customer-form/customer-form.component";
import { CustomerListComponent } from "../customer-list/customer-list.component";
import { CustomerService } from '../../services/customer.service';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'crm-customer-management',
  imports: [CustomerFormComponent, CustomerListComponent],
  templateUrl: './customer-management.component.html',
  styleUrl: './customer-management.component.css'
})
export class CustomerManagementComponent {
  private destoryRef=inject(DestroyRef);
  
  constructor(
    private customerService:CustomerService
  ){}
}
