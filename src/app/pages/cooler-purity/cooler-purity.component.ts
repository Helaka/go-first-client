import { Component, OnInit, ViewChild } from "@angular/core";
import Chart from "chart.js";
import { OutletService } from "../../services/outlet.service";
import { UsersService } from "../../services/users.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { forkJoin } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-cooler-purity",
  templateUrl: "./cooler-purity.component.html",
  styleUrls: ["./cooler-purity.component.css"],
})
export class CoolerPurityComponent implements OnInit {
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

  coolerPurityYesPercentage: number[] = [];
  coolerPurityNoPercentage: number[] = [];

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
      this.canvas.destroy()
    }
    this.canvas = new Chart("myChartCoolerPurity", {
      type: "pie", //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ["Yes", "No"],
        datasets: [
          {
            label: "Cooler Purity",
            data: [
              this.coolerPurityYesPercentage,
              this.coolerPurityNoPercentage,
            ],
            backgroundColor: ["orange", "green"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });

    this.coolerPurityYesPercentage = [];
    this.coolerPurityNoPercentage = [];
  }

  loadCoolerPurity(): void {
    forkJoin({
      coolerPurity: this.outletService.getCoolerPurity(
        this.selectedUser,
        this.selectedDateFrom,
        this.selectedDateTo,
        this.selectedOutlet,
        this.selectedLocation
      ),
    }).subscribe((result) => {
      result.coolerPurity.forEach((purity) => {
        console.log(purity)
        this.coolerPurityYesPercentage.push(purity.yesCountPercentage),
          this.coolerPurityNoPercentage.push(purity.noCountPercentage);
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
      this.loadCoolerPurity();
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
