import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(true);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private role: string = 'user'; // For now, hardcode the role as 'user' or 'admin'

  login() {
    // Simulate a login
    this.isLoggedInSubject.next(true);
    this.role = 'admin'; // Simulate role assignment
  }

  logout() {
    this.isLoggedInSubject.next(false);
  }

  getRole(): string {
    return this.role;
  }
}
