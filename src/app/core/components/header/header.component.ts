import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'crm-header',
  imports: [
    MatButtonModule,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    public authService:AuthService,
  ){}

  ngOnInit(){
  }
}
