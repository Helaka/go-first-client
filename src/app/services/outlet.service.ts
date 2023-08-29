import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OutletService {
  private apiUrl = "http://localhost:3100"; // Replace with your Node.js API URL

  constructor(private http: HttpClient) {}

  getLocations(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/locations/all`);
  }

  getSKU(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sku/all`);
  }

  getAvailabilityCounts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/skuCategory/availability`);
  }

  getOutletsWithSKUs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/outlets/outlets-with-skus`);
  }

  
  // getVisitData():Observable<any>{
  //   return this.http.get<any>(`${this.apiUrl}/visit/filter-data`);

  // }

  getOutletsLocations(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/locations?outletid=${id}`);
  }

  getOutlets(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/outlets`);
  }

  getVisitData(
    userid: any,
    datefrom: any,
    dateto: any,
    outletid: any,
    locationid: any
  ): Observable<any> {
    let params = new HttpParams()
      .set("userId", userid)
      .set("dateFrom", datefrom)
      .set("dateTo", dateto)
      .set("outletId", outletid)
      .set("locationId", locationid);
    return this.http.get<any>(`${this.apiUrl}/visit/filter-data`, {
      params: params,
    });
  }

  getVisitCoordinates(
    userid: any,
    datefrom: any,
    dateto: any,
    outletid: any,
    locationid: any
  ): Observable<any> {
    let params = new HttpParams()
      .set("userId", userid)
      .set("dateFrom", datefrom)
      .set("dateTo", dateto)
      .set("outletId", outletid)
      .set("locationId", locationid);
    return this.http.get<any>(`${this.apiUrl}/visit/visit-coordinates`, {
      params: params,
    });
  }

  getPrimaryVisibility(
    userid: any,
    datefrom: any,
    dateto: any,
    outletid: any,
    locationid: any
  ): Observable<any> {
    let params = new HttpParams()
      .set("userId", userid)
      .set("dateFrom", datefrom)
      .set("dateTo", dateto)
      .set("outletId", outletid)
      .set("locationId", locationid);
    return this.http.get<any>(
      `${this.apiUrl}/visit/filter-primary-visibility`,
      { params: params }
    );
  }

  getPlanogram(
    userid: any,
    datefrom: any,
    dateto: any,
    outletid: any,
    locationid: any
  ): Observable<any> {
    let params = new HttpParams()
      .set("userId", userid)
      .set("dateFrom", datefrom)
      .set("dateTo", dateto)
      .set("outletId", outletid)
      .set("locationId", locationid);
    return this.http.get<any>(`${this.apiUrl}/visit/filter-plangroam`, {
      params: params,
    });
  }

  getCoolerPurity(
    userid: any,
    datefrom: any,
    dateto: any,
    outletid: any,
    locationid: any
  ): Observable<any> {
    let params = new HttpParams()
      .set("userId", userid)
      .set("dateFrom", datefrom)
      .set("dateTo", dateto)
      .set("outletId", outletid)
      .set("locationId", locationid);
    return this.http.get<any>(`${this.apiUrl}/visit/filter-cooler-purity`, {
      params: params,
    });
  }

  getDisplayQuality(
    userid: any,
    datefrom: any,
    dateto: any,
    outletid: any,
    locationid: any
  ): Observable<any> {
    let params = new HttpParams()
      .set("userId", userid)
      .set("dateFrom", datefrom)
      .set("dateTo", dateto)
      .set("outletId", outletid)
      .set("locationId", locationid);
    return this.http.get<any>(`${this.apiUrl}/visit/filter-display-quality`, {
      params: params,
    });
  }

  getCouterAvailability(
    userid: any,
    datefrom: any,
    dateto: any,
    outletid: any,
    locationid: any
  ): Observable<any> {
    let params = new HttpParams()
      .set("userId", userid)
      .set("dateFrom", datefrom)
      .set("dateTo", dateto)
      .set("outletId", outletid)
      .set("locationId", locationid);
    return this.http.get<any>(
      `${this.apiUrl}/visit/filter-couter-top-availability`,
      { params: params }
    );
  }

  getWallBranding(
    userid: any,
    datefrom: any,
    dateto: any,
    outletid: any,
    locationid: any
  ): Observable<any> {
    let params = new HttpParams()
      .set("userId", userid)
      .set("dateFrom", datefrom)
      .set("dateTo", dateto)
      .set("outletId", outletid)
      .set("locationId", locationid);
    return this.http.get<any>(`${this.apiUrl}/visit/filter-wall-branding`, {
      params: params,
    });
  }

  getCompetitorIntelligence(
    userid: any,
    datefrom: any,
    dateto: any,
    outletid: any,
    locationid: any
  ): Observable<any> {
    let params = new HttpParams()
      .set("userId", userid)
      .set("dateFrom", datefrom)
      .set("dateTo", dateto)
      .set("outletId", outletid)
      .set("locationId", locationid);
    return this.http.get<any>(
      `${this.apiUrl}/visit/filter-competitor-intelligence`,
      { params: params }
    );
  }

  getOtherDetails(
    userid: any,
    datefrom: any,
    dateto: any,
    outletid: any,
    locationid: any
  ): Observable<any> {
    let params = new HttpParams()
      .set("userId", userid)
      .set("dateFrom", datefrom)
      .set("dateTo", dateto)
      .set("outletId", outletid)
      .set("locationId", locationid);
    return this.http.get<any>(`${this.apiUrl}/visit/filter-other-details`, {
      params: params,
    });
  }

  getPrimaryShelfShare(
    userid: any,
    datefrom: any,
    dateto: any,
    outletid: any,
    locationid: any
  ): Observable<any> {
    let params = new HttpParams()
      .set("userId", userid)
      .set("dateFrom", datefrom)
      .set("dateTo", dateto)
      .set("outletId", outletid)
      .set("locationId", locationid);
    return this.http.get<any>(`${this.apiUrl}/visit/filter-primary-shelf-share`, {
      params: params,
    });
  }
}

interface ApiResponse {
  [key: string]: { sku_name: string; sku_type: string };
}
