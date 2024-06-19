import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserInfo } from '../infrastructure/interfaces';
import { IsPathAuthorized, getItemByPath, navigation } from 'src/app/app-navigation';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export var LoggedUser: UserInfo;
export function initUserInfo(info: UserInfo) {
  LoggedUser = info
}

const defaultPath = '/';

@Injectable()
export class AuthService {

  get loggedIn(): boolean {
    var user = localStorage.getItem("user");
    return (user != null);
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private http: HttpClient) { }

  async logIn(email: string, password: string) {
    const data = new FormData();
    data.set('email', email);
    data.set('password', password);

    return new Promise<any>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/api/Authentication/GetTokenByPassword`, data)
        .subscribe(
          {
            next: (res: any) => {
              var userInfo: UserInfo = {
                id: res.id,
                email: res.email,
                name: res.name,
                type: res.type,
                roles: res.roles
              };
              localStorage.setItem("user", JSON.stringify(userInfo));
              localStorage.setItem("token", res.token);
              initUserInfo(userInfo);
              this.router.navigate([this._lastAuthenticatedPath]);
              resolve({
                isOk: true,
                data: userInfo,
                message: ""
              });
            },
            error: (e) => {
              var msg;
              switch (e.status) {
                case 401:
                  msg = "Invalid password";
                  break;
                case 406:
                  msg = "Invalid email";
                  break;
                case 403:
                  msg = "Account is locked, try again later";
                  break;
                default:
                  msg = "Server error";
                  console.log(e);
                  break;
              }
              resolve({
                isOk: false,
                data: null,
                message: msg
              });
            },
          }
        );
    });
  }

  async insert(data: any) {
    const formData = new FormData();
    formData.set('values', JSON.stringify(data));
    var res = new Promise<any>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/api/User/Add`, formData).subscribe({
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

  user = LoggedUser;
  logOut() {
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.router.navigate(["/login-form"]);
    }, 100);
  }





  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this.user
      };
    }
    catch {
      return {
        isOk: false,
        data: null
      };
    }
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }
  }

  async resetPassword(email: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  // async logOut() {
  //   this._user = null;
  //   this.router.navigate(['/login-form']);
  // }

}
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    // return isLoggedIn || isAuthForm;
    if (isLoggedIn || isAuthForm) {
      var navigationItem = getItemByPath(navigation, route?.routeConfig?.path ?? "");
      if (navigationItem) {
        if (!IsPathAuthorized(navigationItem))
          this.router.navigate(['/']);
      }
      return true;
    }

    return false;
  }
}
