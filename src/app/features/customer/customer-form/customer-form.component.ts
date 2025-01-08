import { Component, CUSTOM_ELEMENTS_SCHEMA, DestroyRef, inject, output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CustomCardComponent } from "../../../shared/components/custom-card/custom-card.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { regularExpressions } from '../../../shared/common/common';
import { CustomerService } from '../../services/customer.service';
import { ToastService } from '../../../shared/services/toast-service/toast.service';
import { Store } from '@ngrx/store';
import { CustomerActions } from '../../store/customers.action';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'crm-customer-form',
  imports: [
    MatCardModule, 
    CustomCardComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerFormComponent {
  addCustomerForm!:FormGroup;
  private destoryRef=inject(DestroyRef);

  constructor(
    private formBuilder:FormBuilder,
    private customerService:CustomerService,
    private toastService:ToastService,
    private store:Store
  ){}

  ngOnInit(){
    this.addCustomerForm=this.formBuilder.group({
      name:["", [Validators.required, Validators.maxLength(100)]],
      type:["", [Validators.required]],
      status:["", [Validators.required]],
      emailAddress:["", [Validators.required, Validators.email, Validators.maxLength(250)]],
      phoneNumber:["", [Validators.required, Validators.pattern(regularExpressions.phoneNumber), Validators.minLength(10), Validators.minLength(10)]],
      notes:[""],
    });
  }

  addCustomer(){
    this.customerService
      .addCustomer(this.addCustomerForm.value)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe(_customer=>{
        this.toastService.show("Customer Added Successfully.");
        this.addCustomerForm.reset();
        this.store.dispatch(CustomerActions.loadCustomers());
      });
  }
}
