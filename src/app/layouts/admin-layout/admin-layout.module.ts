import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ClipboardModule } from "ngx-clipboard";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// import { ToastrModule } from 'ngx-toastr';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatNativeDateModule } from "@angular/material/core";
import { PrimaryVisibilityComponent } from "../../pages/primary-visibility/primary-visibility.component";
import { PrimaryShelfShareComponent } from "../../pages/primary-shelf-share/primary-shelf-share.component";
import { PlanogramComponent } from "../../pages/planogram/planogram.component";
import { CoolerPurityComponent } from "../../pages/cooler-purity/cooler-purity.component";
import { DisplayUnitComponent } from "../../pages/display-unit/display-unit.component";
import { CounterAvailabilityComponent } from "../../pages/counter-availability/counter-availability.component";
import { WallBrandingComponent } from "../../pages/wall-branding/wall-branding.component";
import { CompetitorIntelligenceComponent } from "../../pages/competitor-intelligence/competitor-intelligence.component";
import { OtherDetailsComponent } from "../../pages/other-details/other-details.component";
import { MapComponent } from "../../pages/map/map.component";

import { GoogleMapsModule } from "@angular/google-maps";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    GoogleMapsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    MapComponent,
    PrimaryVisibilityComponent,
    PrimaryShelfShareComponent,
    PlanogramComponent,
    CoolerPurityComponent,
    DisplayUnitComponent,
    CounterAvailabilityComponent,
    WallBrandingComponent,
    CompetitorIntelligenceComponent,
    OtherDetailsComponent
    
  ],
})
export class AdminLayoutModule {}
