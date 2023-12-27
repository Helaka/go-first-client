import { Component, OnInit, ViewChild } from "@angular/core";
import Chart from "chart.js";
import { OutletService } from "../../services/outlet.service";
import { UsersService } from "../../services/users.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { forkJoin } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-competitor-intelligence",
  templateUrl: "./competitor-intelligence.component.html",
  styleUrls: ["./competitor-intelligence.component.css"],
})
export class CompetitorIntelligenceComponent implements OnInit {
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

  competitorIntelligenceYesPercentage: any[] = [];
  competitiorIntelligenceLabels: any[] = [];

  selectedUser: any;
  selectedOutlet: any;
  selectedLocation: any;
  selectedDateFrom: Date;
  selectedDateTo: Date;

  @ViewChild("myChartCompetitorIntelligence")
  myChartCompetitorIntelligence: any;

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
    this.canvas = this.myChartCompetitorIntelligence.nativeElement;
    this.ctx = this.canvas.getContext("2d");
    new Chart(this.ctx, {
      type: "bar",
      data: {
        datasets: [
          {
            label: "Yes",
            data: this.competitorIntelligenceYesPercentage,
            backgroundColor: "rgb(115 185 243 / 65%)",
            borderColor: "#007ee7",
            fill: true,
          },
        ],
        labels: this.competitiorIntelligenceLabels,
      },
    });
    this.competitorIntelligenceYesPercentage = [];
  }

  loadCompetitorIntelligence(): void {
    console.log("im here");
    forkJoin({
      competitorIntelligence: this.outletService.getCompetitorIntelligence(
        this.selectedUser,
        this.selectedDateFrom,
        this.selectedDateTo,
        this.selectedOutlet,
        this.selectedLocation
      ),
    }).subscribe((result) => {
      result.competitorIntelligence.forEach((intelligence) => {
        console.log("inte", intelligence);
        for (let i = 1; i < Object.keys(intelligence).length; i++) {
          const keys = Object.keys(intelligence)[i];
          const values = Object.values(intelligence)[i];
          this.competitiorIntelligenceLabels.push(keys);
          this.competitorIntelligenceYesPercentage.push(values);
        }
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
      this.loadCompetitorIntelligence();
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
