import { Component, inject } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderService } from '../../services/loader-service/loader.service';

@Component({
  selector: 'crm-loader-container',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loader-container.component.html',
  styleUrl: './loader-container.component.css'
})
export class LoaderContainerComponent {
  loader=inject(LoaderService);
}
