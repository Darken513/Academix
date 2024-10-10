import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

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
  sideCollapsed = false;
  activeLink: string = 'dashboard';
  @Output() collapseEvent: EventEmitter<any> = new EventEmitter();

  screens: screenNavOption[] = [
    {
      name: 'Dashboard',
      icon: 'fas fa-home',
      href: 'admin/dashboard'
    },
    {
      name: 'Users',
      icon: 'fa-solid fa-users',
      href: 'admin/user-management'
    },
    {
      name: 'Courses',
      icon: 'fa-solid fa-calendar-days',
      href: 'admin/cours-management'
    },
    {
      name: 'Rooms',
      icon: 'fa-solid fa-chalkboard-user',
      href: 'admin/room-management'
    },
    {
      name: 'subjects',
      icon: 'fa-solid fa-book',
      href: 'admin/subject-management'
    },
    {
      name: 'Establishments',
      icon: 'fa-solid fa-building',
      href: 'admin/establishment-management'
    },
    {
      name: 'payments',
      icon: 'fa-solid fa-money-check-dollar',
      href: 'admin/payment-management'
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
    this.sideCollapsed = !this.sideCollapsed;
    this.collapseEvent.emit(this.sideCollapsed)
  }
  setActiveLink(link: string) {
    this.activeLink = link; // Update the active link when a nav item is clicked
  }
  logout() {
    this.authService.logout();
  }
}