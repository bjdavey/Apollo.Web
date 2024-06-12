import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { reformatDxHttpParams } from '../utils/devextreme.util';
import { LoadOptions } from 'devextreme/data';

export abstract class BasesService<TModel> {

  constructor(protected http: HttpClient, protected model: string) { }

  createDataSource(): CustomStore<any, number> {
    return new CustomStore({
      key: "id",
      load: (loadOptions) => this.get(loadOptions),
      insert: (data: any) => this.insert(data),
      update: (key, data) => this.update(key, data),
      remove: (key) => this.remove(key),
    });
  }

  getById(id: number) {
    var res = new Promise<any>((resolve, reject) => {
      this.http.get(`/api/${this.model}/GetById/${id}`).subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (e) => {
          reject(e.error.Message);
        }
      });
    });
    return res;
  }

  get(loadOptions: LoadOptions) {
    var res = new Promise<any>((resolve, reject) => {
      this.http.get(`/api/${this.model}/Get`, {
        params: reformatDxHttpParams(loadOptions),
      }).subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (e) => {
          reject(e.error.Message);
        }
      });
    });
    return res;
  }

  insert(data: TModel) {
    const formData = new FormData();
    formData.set('values', JSON.stringify(data));
    var res = new Promise<any>((resolve, reject) => {
      this.http.post(`/api/${this.model}/Add`, formData).subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (e) => {
          reject(e.error.Message);
        }
      });
    });
    return res;
  }

  update(key: number, data: TModel) {
    const formData = new FormData();
    formData.set('key', key.toString());
    formData.set('values', JSON.stringify(data));
    var res = new Promise<any>((resolve, reject) => {
      this.http.put(`/api/${this.model}/Update`, formData).subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (e) => {
          reject(e.error.Message);
        }
      });
    });
    return res;
  }

  remove(key: number) {
    var res = new Promise<any>((resolve, reject) => {
      this.http.delete(`/api/${this.model}/Delete/` + key).subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (e) => {
          reject(e.error.Message);
        }
      });
    });
    return res;
  }

}
