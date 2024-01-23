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
import { AuthGuard } from "src/app/auth.guard";

export const AdminLayoutRoutes: Routes = [
  { path: "availability", component: DashboardComponent, canActivate:[AuthGuard] },
  { path: "primary-visibility", component: PrimaryVisibilityComponent, canActivate:[AuthGuard] },
  { path: "primary-shelf-share", component: PrimaryShelfShareComponent, canActivate:[AuthGuard] },
  { path: "planogram", component: PlanogramComponent, canActivate:[AuthGuard] },
  { path: "cooler-purity", component: CoolerPurityComponent, canActivate:[AuthGuard] },
  { path: "display-unit", component: DisplayUnitComponent , canActivate:[AuthGuard]},
  { path: "maps", component: MapsComponent, canActivate:[AuthGuard] },
  { path: "counter-availability", component: CounterAvailabilityComponent, canActivate:[AuthGuard] },
  { path: "wall-branding", component: WallBrandingComponent, canActivate:[AuthGuard] },
  { path: "competitor-intelligence", component: CompetitorIntelligenceComponent , canActivate:[AuthGuard]},
  { path: "other-details", component: OtherDetailsComponent, canActivate:[AuthGuard] },
  { path: "map", component:MapComponent, canActivate:[AuthGuard]}
];
