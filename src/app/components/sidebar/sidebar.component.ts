import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../auth/auth.service";

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/availability', title: 'Availability',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/primary-visibility', title: 'Primary Visibility',  icon:'ni-planet text-blue', class: '' },
    { path: '/primary-shelf-share', title: 'Primary Shelf Share',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/planogram', title: 'Planogram',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/cooler-purity', title: 'Cooler Purity',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/display-unit', title: 'Display Unit',  icon:'ni-key-25 text-info', class: '' },
    { path: '/counter-availability', title: 'Counter Availability',  icon:'ni-check-bold text-green', class: '' },
    { path: '/wall-branding', title: 'Wall Branding',  icon:'ni-world text-cyan', class: '' },
    { path: '/competitor-intelligence', title: 'Competitor Intelligence',  icon:'ni-tv-2 text-purple', class: '' },
    { path: '/other-details', title: 'Other Details',  icon:'ni-spaceship text-pink', class: '' },
    { path: '/map', title: 'Map',  icon:'ni-square-pin text-red', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
