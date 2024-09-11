import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

interface screenNavOption {
  name: string;
  icon: string;
  href: string;
}

@Component({
  selector: 'app-side-top-menu',
  templateUrl: './side-top-menu.component.html',
  styleUrls: ['./side-top-menu.component.scss']
})
export class SideTopMenuComponent {
  isCollapsed = false;
  activeLink: string = 'dashboard';

  screens: screenNavOption[] = [
    {
      name: 'Dashboard',
      icon: 'fas fa-home',
      href: 'dashboard'
    },
    {
      name: 'calendar',
      icon: 'fa-solid fa-calendar-days',
      href: 'calendar'
    },
    {
      name: 'students',
      icon: 'fa-solid fa-users',
      href: 'students'
    },
    {
      name: 'teachers',
      icon: 'fa-solid fa-chalkboard-user',
      href: 'teachers'
    },
    {
      name: 'payments',
      icon: 'fa-solid fa-money-check-dollar',
      href: 'payments'
    },
    {
      name: 'subjects',
      icon: 'fa-solid fa-book-open',
      href: 'subjects'
    },
    {
      name: 'settings',
      icon: 'fas fa-cog',
      href: 'settings'
    }
  ]

  constructor(private authService: AuthService) {
    //get screens encrypted from server side
    //decrypt it and use it for display
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  setActiveLink(link: string) {
    this.activeLink = link; // Update the active link when a nav item is clicked
  }
  logout() {
    this.authService.logout();
  }
}