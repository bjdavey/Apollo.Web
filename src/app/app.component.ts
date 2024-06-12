import { Component, HostBinding } from '@angular/core';
import { AuthService, ScreenService, AppInfoService, initUserInfo } from './shared/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  environment = environment;

  constructor(private authService: AuthService, private screen: ScreenService, public appInfo: AppInfoService) { 
    var userInfo: any = localStorage.getItem("user");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      initUserInfo(userInfo);
    }
  }

  isAuthenticated() {
    return this.authService.loggedIn;
  }
}
