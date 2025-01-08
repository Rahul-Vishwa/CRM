import { Component, Input } from '@angular/core';

@Component({
  selector: 'crm-custom-card',
  imports: [],
  templateUrl: './custom-card.component.html',
  styleUrl: './custom-card.component.css'
})
export class CustomCardComponent {
  @Input({required:true}) width!:string;
  @Input({required:true}) height!:string;
  @Input({required:false}) shadow:boolean=false;
}
