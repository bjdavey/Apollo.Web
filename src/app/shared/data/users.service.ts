import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { reformatDxHttpParams } from '../utils/devextreme.util';
import { BasesService } from '../infrastructure/base.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersService extends BasesService<any> {

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, "User");
  }

  checkEmailUsed(id: number, email: string) {
    const data = new FormData();
    if (id) data.set('id', id.toString());
    data.set('email', email);
    return this.http.post(`${environment.apiUrl}/api/${this.model}/CheckEmailUsed`, data).toPromise();
  }

  changeUserPassword(id: number, newPassword: string) {
    const data = new FormData();
    data.set('userId', id.toString());
    data.set('newPassword', newPassword);
    return this.http.post(`/api/User/ChangePassword`, data).toPromise();
  }

}
