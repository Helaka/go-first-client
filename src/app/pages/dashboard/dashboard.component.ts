import { Component, OnInit, ViewChild } from "@angular/core";
import Chart from "chart.js";
import { OutletService } from "../../services/outlet.service";
import { UsersService } from "../../services/users.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from "@angular/forms";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../variables/charts";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  locations: any[] = [];
  outletLocations: any = [];
  skus: any[] = [];
  users: any[] = [];
  outlets: any[] = [];
  availabilityCounts: any[] = [];
  selectedUser: any;
  selectedOutlet: any;
  selectedLocation: any;
  selectedDateFrom: Date;
  selectedDateTo: Date;
  yesCounts: number[] = [];
  noCounts: number[] = [];

  yesPercentage: number[] = [];
  primaryYesPercentage: number[] = [];

  primaryNoPercentage: number[] = [];
  noPercentage: number[] = [];

  planogramYesPercentage: number[] = [];
  planogramNoPercentage: number[] = [];

  coolerPurityYesPercentage: number[] = [];
  coolerPurityNoPercentage: number[] = [];

  displayQualityYesPercentage: number[] = [];
  displayQualityNoPercentage: number[] = [];

  counterAvailabilityYesPercentage: number[] = [];
  counterAvailabilityNoPecentage: number[] = [];

  wallBrandingYesPercentage: number[] = [];
  wallBrandingNoPercentage: number[] = [];

  competitorIntelligenceVisibilityPercentage: number[] = [];
  competitorIntelligenceFreeOfferPercentage: number[] = [];
  competitorIntelligenceRewardsPercentage: number[] = [];
  competitorIntelligenceSamplingPercentage: number[] = [];

  competitorIntelligenceYesPercentage: any[] = [];
  competitiorIntelligenceLabels: any[] = [];

  otherDetailsYesPercentage: any[] = [];
  otherDetailsLabels: any[] = [];

  primaryShelfShareYesPercentage: any[] = [];
  primaryShelfShareLabels: any[] = [];

  constructor(
    private outletService: OutletService,
    private usersService: UsersService
  ) {
    this.loadOutlets();
    this.loadLocations();
    this.loadUsers();
    this.loadAvailabilityCounts();
    // this.getOutletsWithSKUs();
    // this.filterData();
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  panelOpenState = false;
  ngOnInit() {}
  // myChartPrimaryShelfShare
  canvas: any;
  ctx: any;
  @ViewChild("myChartAvailability") myChartAvailability: any;
  @ViewChild("myChartCompetitorIntelligence")
  myChartCompetitorIntelligence: any;
  @ViewChild("myChartOtherDetails") myChartOtherDetails: any;
  @ViewChild("myChartPrimaryShelfShare") myChartPrimaryShelfShare: any;

  ngAfterViewInit() {
    // this.loadData();
    // this.loadData2();
  }

  initializeChart() {
    this.canvas = this.myChartAvailability.nativeElement;
    this.ctx = this.canvas.getContext("2d");
    new Chart(this.ctx, {
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
            backgroundColor: ["red", "pink"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  initializeChart3() {
    this.canvas = new Chart("myChartPlanogram", {
      type: "pie", //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ["Yes", "No"],
        datasets: [
          {
            label: "Planogram",
            data: [this.planogramYesPercentage, this.planogramNoPercentage],
            backgroundColor: ["blue", "yellow"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  initializeChart4() {
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
  }

  initializeChart5() {
    this.canvas = new Chart("myChartDisplayQuality", {
      type: "pie", //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ["Yes", "No"],
        datasets: [
          {
            label: "Display Good Quality",
            data: [
              this.displayQualityYesPercentage,
              this.displayQualityNoPercentage,
            ],
            backgroundColor: ["yellow", "green"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  initializeChart6() {
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
            backgroundColor: ["purple", "yellow"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  initializeChart7() {
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
  }

  initializeChart8() {
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
  }

  initializeChart9() {
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
  }

  initializeChart10() {
    this.canvas = this.myChartOtherDetails.nativeElement;
    this.ctx = this.canvas.getContext("2d");
    new Chart(this.ctx, {
      type: "bar",
      data: {
        datasets: [
          {
            label: "Yes",
            data: this.otherDetailsYesPercentage,
            backgroundColor: "rgb(115 185 243 / 65%)",
            borderColor: "#007ee7",
            fill: true,
          },
        ],
        labels: this.otherDetailsLabels,
      },
    });
  }

  initializeChart11() {
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

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
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

  loadSkus(): void {
    this.outletService.getSKU().subscribe((response) => {
      this.skus = [];
      response.forEach((item) => {
        item.skuCategory.forEach((category) => {
          this.skus.push(`${item.sku_name} ${category.sku_type}`);
        });
      });

      // Initialize the chart after processing the response
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

  // loadData(): void {
  //   forkJoin({
  //     skusData: this.outletService.getSKU(),
  //     countsData: this.outletService.getAvailabilityCounts(),
  //     filterData: this.outletService.getVisitData(),
  //   }).subscribe((result) => {
  //     const skuSubIdToCountsMap: Record<
  //       number,
  //       { yesCount: number; noCount: number }
  //     > = {};

  //     console.log("filteData2", result.filterData);
  //     console.log("countData", result.countsData);
  //     // Map counts to skuSubIds
  //     result.countsData.forEach((count) => {
  //       skuSubIdToCountsMap[count.skuSubId] = {
  //         yesCount: count.count_ones,
  //         noCount: count.count_zeros,
  //       };
  //     });

  //     this.skus = [];
  //     this.yesPercentage = [];
  //     this.noPercentage = [];

  //     result.skusData.forEach((skuItem) => {
  //       skuItem.skuCategory.forEach((subCategory) => {
  //         const skuLabel = `${skuItem.sku_name} ${subCategory.sku_type}`;
  //         this.skus.push(skuLabel);
  //         const counts = skuSubIdToCountsMap[subCategory.id] || {
  //           yesCount: 0,
  //           noCount: 0,
  //         };

  //         const total = counts.yesCount + counts.noCount;

  //         const yesPercent = total ? (counts.yesCount / total) * 100 : 0;

  //         const noPercent = 100 - yesPercent;

  //         this.yesPercentage.push(yesPercent);
  //         this.noPercentage.push(noPercent);
  //       });
  //     });

  //     this.initializeChart();
  //   });
  // }

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
        const skuLable = `${skuItem.sku_name} ${skuItem.sku_type}`;
        this.skus.push(skuLable);
        this.yesPercentage.push(skuItem.yesPercentage);
        this.noPercentage.push(skuItem.noPercentage);
      });
      this.initializeChart();
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
      this.initializeChart3();
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
      this.initializeChart3();
    });
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
        this.coolerPurityYesPercentage.push(purity.yesCountPercentage),
          this.coolerPurityNoPercentage.push(purity.noCountPercentage);
      });
      this.initializeChart4();
    });
  }

  loadDisplayQuality(): void {
    forkJoin({
      displayQuality: this.outletService.getDisplayQuality(
        this.selectedUser,
        this.selectedDateFrom,
        this.selectedDateTo,
        this.selectedOutlet,
        this.selectedLocation
      ),
    }).subscribe((result) => {
      result.displayQuality.forEach((display) => {
        this.displayQualityYesPercentage.push(display.yesCountPercentage),
          this.displayQualityNoPercentage.push(display.noCountPercentage);
      });
      this.initializeChart5();
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
        console.log("cAva", counterAvilability);
        this.counterAvailabilityYesPercentage.push(
          counterAvilability.yesCountPercentage
        ),
          this.counterAvailabilityNoPecentage.push(
            counterAvilability.noCountPercentage
          );
      });
      this.initializeChart6();
    });
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
        this.wallBrandingYesPercentage.push(branding.yesCountPercentage),
          this.wallBrandingNoPercentage.push(branding.noCountPercentage);
      });
      this.initializeChart7();
    });
  }

  loadCompetitorIntelligence(): void {
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
        for (let i = 1; i < Object.keys(intelligence).length; i++) {
          const keys = Object.keys(intelligence)[i];
          const values = Object.values(intelligence)[i];
          this.competitiorIntelligenceLabels.push(keys);
          this.competitorIntelligenceYesPercentage.push(values);
        }
      });
      this.initializeChart9();
    });
  }

  loadOtherDetails(): void {
    forkJoin({
      otherDetails: this.outletService.getOtherDetails(
        this.selectedUser,
        this.selectedDateFrom,
        this.selectedDateTo,
        this.selectedOutlet,
        this.selectedLocation
      ),
    }).subscribe((result) => {
      result.otherDetails.forEach((other) => {
        for (let i = 1; i < Object.keys(other).length; i++) {
          const keys = Object.keys(other)[i];
          const values = Object.values(other)[i];

          this.otherDetailsYesPercentage.push(values);
          this.otherDetailsLabels.push(keys);
        }
      });
      this.initializeChart10();
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
      this.primaryShelfShareLabels = result.shelfShare.map(item=>item.sku_name + " (" + item.sku_type + ")");
      this.primaryShelfShareYesPercentage = result.shelfShare.map(item => parseFloat(item.frontFacingPercentage));
  
      
      // this.primaryShelfShareLabels.push(labels);
      // this.primaryShelfShareYesPercentage.push(values);
      this.initializeChart11();
    });
  }

  filterData() {
    this.loadData2();
    this.loadPrimaryVisibility();
    this.loadPlanogram();
    this.loadCoolerPurity();
    this.loadDisplayQuality();
    this.loadCounterTopAvailability();
    this.loadWallBranding();
    this.loadCompetitorIntelligence();
    this.loadOtherDetails();
    this.loadPrimaryShelfShare();
  }

  handleLocationChange() {
    console.log(this.selectedLocation);
  }
}
