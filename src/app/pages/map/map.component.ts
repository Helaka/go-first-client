import { Component, OnInit } from "@angular/core";
import { OutletService } from "../../services/outlet.service";
import { UsersService } from "../../services/users.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  center = { lat: 7.8731, lng: 80.7718 }; // Sri Lanka
  zoom = 9;

  markers = [];

  outletLocations: any = [];
  outlets: any[] = [];
  users: any[] = [];
  canvas: any;
  ctx: any;

  selectedUser: any;
  selectedOutlet: any;
  selectedLocation: any;
  selectedDateFrom: Date;
  selectedDateTo: Date;

  constructor(
    private outletService: OutletService,
    private usersService: UsersService,
    private toastr: ToastrService
  ) {
    this.loadUsers();
    this.loadOutlets();
  }

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

  loadGpsCoordinates(): void {
    this.outletService
      .getVisitCoordinates(
        this.selectedUser,
        this.selectedDateFrom,
        this.selectedDateTo,
        this.selectedOutlet,
        this.selectedLocation
      )
      .subscribe((response) => {
        console.log("respinsgps", response);
        this.markers = this.transformResponseToMarkers(response);
      });
  }

  transformResponseToMarkers(response: any[]) {
    return response.map((item) => {
      const [lat, lng] = item.gpsLocation.split(",").map(Number);
      return { lat, lng, label: `${item.id}`, draggable: false };
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
      this.loadGpsCoordinates();
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
