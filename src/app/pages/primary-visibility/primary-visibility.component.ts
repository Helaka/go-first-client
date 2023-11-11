import { Component, OnInit, ViewChild } from "@angular/core";
import Chart from "chart.js";
import { OutletService } from "../../services/outlet.service";
import { UsersService } from "../../services/users.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { forkJoin } from "rxjs";
import { ToastrService } from "ngx-toastr";

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../variables/charts";

@Component({
  selector: "app-primary-visibility",
  templateUrl: "./primary-visibility.component.html",
  styleUrls: ["./primary-visibility.component.css"],
})
export class PrimaryVisibilityComponent implements OnInit {
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

  canvas: any;
  primaryYesPercentage: number[] = [];
  primaryNoPercentage: number[] = [];
  outletLocations: any = [];
  outlets: any[] = [];
  users: any[] = [];

  selectedUser: any;
  selectedOutlet: any;
  selectedLocation: any;
  selectedDateFrom: Date;
  selectedDateTo: Date;

  initializeChart2() {
    this.canvas = new Chart("myChartPrimaryVisibility", {
      type: "pie", //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ["Yes", "No"],
        datasets: [
          {
            label: "Primary Shelf Share",
            data: [this.primaryYesPercentage, this.primaryNoPercentage],
            backgroundColor: ["red", "blue"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  loadPrimaryVisibility(): void {
    forkJoin({
      primaryShelfShare: this.outletService.getPrimaryVisibility(
        this.selectedUser,
        this.selectedDateFrom,
        this.selectedDateTo,
        this.selectedOutlet,
        this.selectedLocation
      ),
    }).subscribe((result) => {
      result.primaryShelfShare.forEach((primary) => {
        this.primaryYesPercentage.push(primary.yesCountPercentage),
          this.primaryNoPercentage.push(primary.noCountPercentage);
      });
      this.initializeChart2();
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
      this.loadPrimaryVisibility();
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
}
