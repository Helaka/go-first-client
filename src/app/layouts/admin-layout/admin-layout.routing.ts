import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
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

export const AdminLayoutRoutes: Routes = [
  { path: "availability", component: DashboardComponent },
  { path: "primary-visibility", component: PrimaryVisibilityComponent },
  { path: "primary-shelf-share", component: PrimaryShelfShareComponent },
  { path: "planogram", component: PlanogramComponent },
  { path: "cooler-purity", component: CoolerPurityComponent },
  { path: "display-unit", component: DisplayUnitComponent },
  { path: "maps", component: MapsComponent },
  { path: "counter-availability", component: CounterAvailabilityComponent },
  { path: "wall-branding", component: WallBrandingComponent },
  { path: "competitor-intelligence", component: CompetitorIntelligenceComponent },
  { path: "other-details", component: OtherDetailsComponent },
  { path: "map", component:MapComponent}
];
