import { Component, OnInit, ViewChild } from "@angular/core";
import Chart from "chart.js";
import { OutletService } from "../../services/outlet.service";
import { UsersService } from "../../services/users.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { forkJoin } from "rxjs";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-planogram',
  templateUrl: './planogram.component.html',
  styleUrls: ['./planogram.component.css']
})
export class PlanogramComponent implements OnInit {

  constructor(  private outletService: OutletService,
    private usersService: UsersService,
    private toastr: ToastrService,
    private snackBar: MatSnackBar) { 
      this.loadUsers();
      this.loadOutlets();
    }

  ngOnInit(): void {
  }

  outletLocations: any = [];
  outlets: any[] = [];
  users: any[] = [];
  canvas: any;
  ctx: any;

  planogramYesPercentage: number[] = [];
  planogramNoPercentage: number[] = [];

  selectedUser: any;
  selectedOutlet: any;
  selectedLocation: any;
  selectedDateFrom: Date;
  selectedDateTo: Date;

  initializeChart() {
    this.canvas = new Chart("myChartPlanogram", {
      type: "pie", //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ["Yes", "No"],
        datasets: [
          {
            label: "Planogram",
            data: [this.planogramYesPercentage, this.planogramNoPercentage],
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

  loadPlanogram(): void {
    forkJoin({
      palnogram: this.outletService.getPlanogram(
        this.selectedUser,
        this.selectedDateFrom,
        this.selectedDateTo,
        this.selectedOutlet,
        this.selectedLocation
      ),
    }).subscribe((result) => {
      result.palnogram.forEach((primary) => {
        this.planogramYesPercentage.push(primary.yesCountPercentage),
          this.planogramNoPercentage.push(primary.noCountPercentage);
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
      this.loadPlanogram();
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
