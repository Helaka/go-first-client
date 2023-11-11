import { Component, OnInit, ViewChild } from "@angular/core";
import Chart from "chart.js";
import { OutletService } from "../../services/outlet.service";
import { UsersService } from "../../services/users.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { forkJoin } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-counter-availability",
  templateUrl: "./counter-availability.component.html",
  styleUrls: ["./counter-availability.component.css"],
})
export class CounterAvailabilityComponent implements OnInit {
  constructor(
    private outletService: OutletService,
    private usersService: UsersService,
    private toastr: ToastrService,
    private snackBar: MatSnackBar
  ) {
    this.loadUsers();
    this.loadOutlets();
  }

  outletLocations: any = [];
  outlets: any[] = [];
  users: any[] = [];
  canvas: any;
  ctx: any;

  counterAvailabilityYesPercentage: number[] = [];
  counterAvailabilityNoPecentage: number[] = [];

  selectedUser: any;
  selectedOutlet: any;
  selectedLocation: any;
  selectedDateFrom: Date;
  selectedDateTo: Date;

  ngOnInit(): void {}

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
    this.canvas = new Chart("myChartCounterAvailability", {
      type: "pie", //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ["Yes", "No"],
        datasets: [
          {
            label: "Counter Top Availability",
            data: [
              this.counterAvailabilityYesPercentage,
              this.counterAvailabilityNoPecentage,
            ],
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

  loadCounterTopAvailability(): void {
    forkJoin({
      counterAvailability: this.outletService.getCouterAvailability(
        this.selectedUser,
        this.selectedDateFrom,
        this.selectedDateTo,
        this.selectedOutlet,
        this.selectedLocation
      ),
    }).subscribe((result) => {
      result.counterAvailability.forEach((counterAvilability) => {
        this.counterAvailabilityYesPercentage.push(
          counterAvilability.yesCountPercentage
        ),
          this.counterAvailabilityNoPecentage.push(
            counterAvilability.noCountPercentage
          );
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
      this.loadCounterTopAvailability();
    }
  }

  handleLocationChange() {
    console.log(this.selectedLocation);
  }

  handleChange() {
    this.outletService
      .getOutletsLocations(this.selectedOutlet)
      .subscribe((response) => {
        this.outletLocations = response;
      });
  }
}
