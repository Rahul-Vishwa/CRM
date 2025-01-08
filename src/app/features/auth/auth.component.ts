import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../shared/services/toast-service/toast.service';

interface AuthForm{
  email:FormControl<string>;
  password:FormControl<string>;
  username?:FormControl<string>;
}

@Component({
  selector: 'crm-auth',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  authForm!:FormGroup<AuthForm>;
  authType="";
  hide = signal(true);
  authTitle=signal("");
  returnUrl=signal<string>("/home");
  private destroyRef=inject(DestroyRef);

  constructor(
    private activatedRoute:ActivatedRoute,
    private authService:AuthService,
    private router:Router,
    private toast:ToastService,
  ){
    this.authForm=new FormGroup({
      email:new FormControl("", {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.email
        ],
        nonNullable: true
      }),
      password:new FormControl("", {
        validators: [
          Validators.required,
          Validators.minLength(5),
        ],
        nonNullable: true
      })
    });
  }

  ngOnInit(){
    this.activatedRoute.queryParams.pipe().subscribe(params=>{
      this.returnUrl.set(params["returnUrl"] || this.returnUrl());
    });

    this.authType=this.activatedRoute.snapshot.url.at(-1)?.path??"";
    this.authTitle.set(this.authType==="signin"?"Sign In":"Sign Up");

    if (this.authType==="signup"){
      this.authForm.addControl(
        "username",
        new FormControl("", {
          validators:[
            Validators.required,
            Validators.minLength(5),
          ],
          nonNullable:true
        })
      );
    }
  }

  submitForm(){
    this.authForm.disable();
    if (this.authType==="signup"){
      this.authService.register(
        this.authForm.value as {
          username:string,
          email:string,
          password:string
        }
      ).subscribe({
        next:()=>{
          if (this)
          this.router.navigate([this.returnUrl()]);
        },
        error:(error:HttpErrorResponse)=>{
          if (error.status===409){
            this.showToast("Email already Exists.");
            this.authForm.enable();
          }
        }
      });
    }
    else{
      this.authService.login(
        this.authForm.value as {
          email:string,
          password:string
        }
      ).subscribe({
        next:()=>{
          this.router.navigate([this.returnUrl()]);
        },
        error:(error:HttpErrorResponse)=>{
          if (error.status===401){
            this.showToast("User does'nt Exists.");
            this.authForm.enable();
          }
        },
      });
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  showToast(text:string) {
    this.toast.clear();
		this.toast.show(text);
	}
}
