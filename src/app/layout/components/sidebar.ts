import {Component, signal} from '@angular/core';
import {SidebarNavItem} from '../models/sidebar-nav-item';
import {MatIcon} from '@angular/material/icon';
import {MatFabButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatIcon,
    MatFabButton,
    RouterLink
  ],
  template: `
    <div class="flex flex-col h-screen gap-10 justify-center items-center">
      @for (item of navItems(); track item.name) {
        <button matFab [routerLink]="item.route">
          <mat-icon>{{ item.icon }}</mat-icon>
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class Sidebar {
  readonly navItems = signal<SidebarNavItem[]>([
    {
      name: 'Dashboard',
      icon: 'dashboard',
      route: 'dashboard',
    },
    {
      name: 'Calendar',
      icon: 'calendar_month',
      route: 'calendar',
    },
    {
      name: 'Products',
      icon: 'inventory',
      route: 'products',
    },
    {
      name: 'Recipes',
      icon: 'menu_book_2',
      route: 'recipes',
    },
    {
      name: 'Chores',
      icon: 'cleaning_services',
      route: 'chores',
    }
  ]);
}
