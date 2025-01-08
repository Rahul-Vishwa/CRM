import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast-service/toast.service';
import { NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'crm-toast-container',
  imports: [NgbToastModule],
  templateUrl:'./toast-container.component.html',
  styleUrl:'./toast-container.component.css',
  host: { class: 'position-fixed top-0 end-0 p-3', style: 'z-index: 1200' }
})
export class ToastContainerComponent {
  toastService = inject(ToastService);
}
