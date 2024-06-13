  import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { reformatDxHttpParams } from '../utils/devextreme.util';
import { BasesService } from '../infrastructure/base.service';

@Injectable()
export class CustomersService extends BasesService<any> {

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, "Customer");
  }

}
