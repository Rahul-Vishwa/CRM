import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, distinctUntilChanged, map, shareReplay, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl=environment.apiUrl;

  private readonly currentUserSubject=new BehaviorSubject<User|null>(null);
  currentUser$=this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  
  showLogoutButton:boolean=false;

  constructor(
    private http:HttpClient
  ) { }

  register(credentials:{
    username:string,
    email:string
    password:string,
  }){
    return this.http.post<{user:User}>('/users', credentials)
      .pipe(
        tap(user=>{
          this.setUser(user.user);
        })
      );
  }
  
  login(credentials:{
    email:string
    password:string,
  }){
    return this.http.post<{user:User}>('/account/login', credentials)
      .pipe(
        tap(user=>{
          this.setUser(user.user);
        }),
        map(user=>user)
      );
  }

  isAuthenticated(){
    return this.http.get<{isauth:true}>('/account/is-authenticated')
      .pipe(
        shareReplay(1)
      );
  }

  getCurrentUser(){
    return this.http.get<{user:User}>('/account/get-current-user')
      .pipe(
        tap({
          next:user=>this.setUser(user.user),
          error:()=>this.logout()
        }),
        shareReplay(1)
      );
  }

  setUser(user:User){
    this.currentUserSubject.next(user)
    localStorage.setItem('token', user.token);
  }

  logout(){
    this.currentUserSubject.next(null);
    localStorage.removeItem('token');
  }
}
