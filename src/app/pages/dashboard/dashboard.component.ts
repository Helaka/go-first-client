import { Component, OnInit, ViewChild } from "@angular/core";
import Chart from "chart.js";
import { OutletService } from "../../services/outlet.service";
import { UsersService } from "../../services/users.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { Observable, fromEventPattern } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  chartInstance: Chart | null = null;
  locations: any[] = [];
  outletLocations: any = [];
  skus: any[] = [];
  users: any[] = [];
  outlets: any[] = [];

  selectedUser: any;
  selectedOutlet: any;
  selectedLocation: any;
  selectedDateFrom: Date;
  selectedDateTo: Date;
  yesCounts: number[] = [];
  noCounts: number[] = [];

  yesPercentage: number[] = [];
  noPercentage: number[] = [];

  constructor(
    private outletService: OutletService,
    private usersService: UsersService,
    private toastr: ToastrService,
    private snackBar: MatSnackBar
  ) {
    this.loadOutlets();
    this.loadLocations();
    this.loadUsers();
    this.loadAvailabilityCounts();
  }

  ngOnInit() {}

  canvas: any;
  ctx: any;
  @ViewChild("myChartAvailability") myChartAvailability: any;

  initializeChart() {
    if (this.chartInstance) {
      this.chartInstance.destroy(); // Destroy the old instance before creating a new one
    }
    this.canvas = this.myChartAvailability.nativeElement;
    this.ctx = this.canvas.getContext("2d");
    this.chartInstance = new Chart(this.ctx, {
      type: "bar",
      data: {
        datasets: [
          {
            label: "Yes",
            data: this.yesPercentage,
            backgroundColor: "rgb(115 185 243 / 65%)",
            borderColor: "#007ee7",
            fill: true,
          },
          {
            label: "No",
            data: this.noPercentage,
            backgroundColor: "#47a0e8",
            borderColor: "#007ee7",
            fill: true,
          },
        ],
        labels: this.skus,
      },
    });
  }
  loadLocations(): void {
    this.outletService.getLocations().subscribe((response) => {
      this.locations = response;
    });
  }
  loadOutlets(): void {
    this.outletService.getOutlets().subscribe((response) => {
      this.outlets = response;
    });
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  loadAvailabilityCounts(): void {
    this.outletService.getAvailabilityCounts().subscribe((response) => {
      response.forEach((counts) => {
        this.yesCounts.push(counts.count_ones);
        this.noCounts.push(counts.count_zeros);
      });
    });
  }

  getOutletsWithSKUs(): void {
    this.outletService.getOutletsWithSKUs().subscribe((response) => {});
  }

  handleChange() {
    this.outletService
      .getOutletsLocations(this.selectedOutlet)
      .subscribe((response) => {
        this.outletLocations = response;
      });
  }

  loadData2(): void {
    this.skus = [];
    this.yesPercentage = [];
    this.noPercentage = [];
    forkJoin({
      filterData: this.outletService.getVisitData(
        this.selectedUser,
        this.selectedDateFrom,
        this.selectedDateTo,
        this.selectedOutlet,
        this.selectedLocation
      ),
    }).subscribe((result) => {
      result.filterData.forEach((skuItem) => {
        console.log("SkuItems", skuItem)
        const skuLable = `${skuItem.sku_name} ${skuItem.sku_type}`;
        this.skus.push(skuLable);
        this.yesPercentage.push(skuItem.YesPercentage);
        this.noPercentage.push(skuItem.NoPercentage);
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
    }else{
      this.loadData2();
    }
  }

  handleLocationChange() {
    console.log(this.selectedLocation);
  }
}
