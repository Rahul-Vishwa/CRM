import { Component } from '@angular/core';
import { CustomerFormComponent } from '../../../features/customer/customer-form/customer-form.component';
import { CustomerManagementComponent } from "../../../features/customer/customer-management/customer-management.component";

@Component({
  selector: 'app-home',
  imports: [CustomerManagementComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(){}
}
