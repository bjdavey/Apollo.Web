import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { reformatDxHttpParams } from '../utils/devextreme.util';
import { BasesService } from '../infrastructure/base.service';

@Injectable()
export class VehiclesService extends BasesService<any> {

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, "Vehicle");
  }

  checkDeviceUniqueUsed(id: number, deviceUnique: string) {
    const data = new FormData();
    if (id) data.set('id', id.toString());
    data.set('deviceUnique', deviceUnique);
    return this.http.post(`/api/${this.model}/CheckDeviceUniqueUsed`, data).toPromise();
  }

  getVehicleDetails(id: number) {
    var res = new Promise<any>((resolve, reject) => {
      this.http.get(`/api/${this.model}/GetDetails/${id}`).subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (e) => {
          reject(e?.error?.Message);
        }
      });
    });
    return res;
  }

  getVehicles() {
    var res = new Promise<any>((resolve, reject) => {
      this.http.get(`/api/${this.model}/GetVehicles`).subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (e) => {
          reject(e?.error?.Message);
        }
      });
    });
    return res;
  }

}
