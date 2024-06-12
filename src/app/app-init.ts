import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Title } from "@angular/platform-browser";
import * as dxLocalization from "devextreme/localization";
import config from "devextreme/core/config";
import { initUserInfo } from './shared/services';

@Injectable()
export class AppInitService {

  constructor() { }

  async Init() {
    var userInfo: any = localStorage.getItem("user");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      initUserInfo(userInfo);
    }

    //Devextreme config
    config({
      forceIsoDateParsing: true
    })
    // dxLocalization.loadMessages({
    //   "de": dxMessages.ar,
    // });
    // dxLocalization.locale("de");
    //--------

    return new Promise<void>((resolve, reject) => {
      let loader = document.getElementById("loader");
      if (loader) {
        loader.style.display = 'none';
      }
      resolve();
    });
  }

}

export function initializeApp(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.Init();
  };
}

