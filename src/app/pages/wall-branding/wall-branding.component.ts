import { Component, OnInit, ViewChild } from "@angular/core";
import Chart from "chart.js";
import { OutletService } from "../../services/outlet.service";
import { UsersService } from "../../services/users.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { forkJoin } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-wall-branding",
  templateUrl: "./wall-branding.component.html",
  styleUrls: ["./wall-branding.component.css"],
})
export class WallBrandingComponent implements OnInit {
  constructor(
    private outletService: OutletService,
    private usersService: UsersService,
    private toastr: ToastrService,
    private snackBar: MatSnackBar
  ) {
    this.loadUsers();
    this.loadOutlets();
  }

  ngOnInit(): void {}

  outletLocations: any = [];
  outlets: any[] = [];
  users: any[] = [];
  canvas: any;
  ctx: any;

  wallBrandingYesPercentage: number[] = [];
  wallBrandingNoPercentage: number[] = [];

  selectedUser: any;
  selectedOutlet: any;
  selectedLocation: any;
  selectedDateFrom: Date;
  selectedDateTo: Date;

  loadUsers(): void {
    this.usersService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  loadOutlets(): void {
    this.outletService.getOutlets().subscribe((response) => {
      this.outlets = response;
    });
  }

  initializeChart() {
    if(this.canvas){
      this.canvas.destroy();
    }
    this.canvas = new Chart("myChartWallBranding", {
      type: "pie", //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ["Yes", "No"],
        datasets: [
          {
            label: "Wall Branding",
            data: [
              this.wallBrandingYesPercentage,
              this.wallBrandingNoPercentage,
            ],
            backgroundColor: ["orange", "blue"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });

    this.wallBrandingYesPercentage = [];
    this.wallBrandingNoPercentage = [];
  }

  loadWallBranding(): void {
    forkJoin({
      wallBranding: this.outletService.getWallBranding(
        this.selectedUser,
        this.selectedDateFrom,
        this.selectedDateTo,
        this.selectedOutlet,
        this.selectedLocation
      ),
    }).subscribe((result) => {
      result.wallBranding.forEach((branding) => {
        console.log("branding", branding);
        this.wallBrandingYesPercentage.push(branding.yesCountPercentage),
          this.wallBrandingNoPercentage.push(branding.noCountPercentage);
      });
      this.initializeChart();
    });
  }

  filterData() {
    if (
      !this.selectedUser &&
      !this.selectedDateFrom &&
      !this.selectedDateTo &&
      !this.selectedOutlet &&
      !this.selectedLocation
    ) {
      this.toastr.error("Please select at least one from filters");
    } else if (
      (this.selectedDateFrom && !this.selectedDateTo) ||
      (!this.selectedDateFrom && this.selectedDateTo)
    ) {
      this.toastr.error("Please select both From and To dates");
    } else if (!this.selectedOutlet && this.selectedLocation) {
      this.toastr.error("Please select outlet");
    } else if (
      (this.selectedUser && this.selectedDateFrom && !this.selectedDateTo) ||
      (this.selectedUser && !this.selectedDateFrom && this.selectedDateTo)
    ) {
      this.toastr.error("Please select both From and To dates");
    } else {
      this.loadWallBranding();
    }
  }

  handleChange() {
    this.outletService
      .getOutletsLocations(this.selectedOutlet)
      .subscribe((response) => {
        this.outletLocations = response;
      });
  }

  handleLocationChange() {
    console.log(this.selectedLocation);
  }
  
}
