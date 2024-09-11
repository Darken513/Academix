import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  isCollapsed = false;
  activeLink = 'dashboard';

  userRole: string = '';

  constructor(private authService: AuthService) {
    this.userRole = this.authService.getRole(); // Assuming getRole() returns 'admin' or 'user'
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