import { Component, OnInit, ViewChild } from "@angular/core";
import Chart from "chart.js";
import { OutletService } from "../../services/outlet.service";
import { UsersService } from "../../services/users.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { forkJoin } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-primary-shelf-share",
  templateUrl: "./primary-shelf-share.component.html",
  styleUrls: ["./primary-shelf-share.component.css"],
})
export class PrimaryShelfShareComponent implements OnInit {
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

  primaryShelfShareYesPercentage: any[] = [];
  primaryShelfShareLabels: any[] = [];

  selectedUser: any;
  selectedOutlet: any;
  selectedLocation: any;
  selectedDateFrom: Date;
  selectedDateTo: Date;

  @ViewChild("myChartPrimaryShelfShare") myChartPrimaryShelfShare: any;

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
    this.canvas = this.myChartPrimaryShelfShare.nativeElement;
    this.ctx = this.canvas.getContext("2d");
    new Chart(this.ctx, {
      type: "bar",
      data: {
        datasets: [
          {
            label: "Front Face",
            data: this.primaryShelfShareYesPercentage,
            backgroundColor: "rgb(115 185 243 / 65%)",
            borderColor: "#007ee7",
            fill: true,
          },
        ],
        labels: this.primaryShelfShareLabels,
      },
    });
  }

  loadPrimaryShelfShare(): void {
    forkJoin({
      shelfShare: this.outletService.getPrimaryShelfShare(
        this.selectedUser,
        this.selectedDateFrom,
        this.selectedDateTo,
        this.selectedOutlet,
        this.selectedLocation
      ),
    }).subscribe((result) => {
      this.primaryShelfShareLabels = result.shelfShare.map(
        (item) => item.sku_name + " (" + item.sku_type + ")"
      );
      this.primaryShelfShareYesPercentage = result.shelfShare.map((item) =>
        parseFloat(item.frontFacingPercentage)
      );

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
      this.loadPrimaryShelfShare();
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
