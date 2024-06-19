import { Component } from '@angular/core';
import { GetFileURL, GetObjectsDifference } from 'src/app/shared/utils/helpers';
import validationEngine from 'devextreme/ui/validation_engine';
import { Brands, PRICE_MODEL, USER_TYPE, VehiclePriceModels, VehicleStatuses, VehicleTypes, Years } from 'src/app/shared/infrastructure/enums';
import * as moment from 'moment';
import { OrdersService } from 'src/app/shared/data/orders.service';
import { confirm, alert } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import { LoggedUser } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent {

  LoggedUser = LoggedUser;
  USER_TYPE = USER_TYPE;
  
  moment = moment;
  getFileURL = GetFileURL;

  brandsEditorOptions = {
    dataSource: Brands,
    searchEnabled: true,
  };
  yearsEditorOptions = {
    dataSource: Years,
    searchEnabled: true,
  };
  typesEditorOptions = {
    dataSource: VehicleTypes,
    valueExpr: "id",
    displayExpr: "text",
    searchEnabled: true,
  };
  priceModelEditorOptions = {
    dataSource: VehiclePriceModels,
    valueExpr: "id",
    displayExpr: "text",
    searchEnabled: true,
  };
  vehicleStatusEditorOptions = {
    dataSource: VehicleStatuses,
    valueExpr: "id",
    displayExpr: "text",
    searchEnabled: true,
  };

  visible = false;
  resolve: any;

  vehicle: any;
  newOrder: any = {};
  device: any = {};
  loading = false;
  error = null;


  constructor(private ordersService: OrdersService) {
    this.save = this.save.bind(this);
    this.close = this.close.bind(this);
  }

  ngOnInit(): void {
  }

  show(vehicle: any, device: any): Promise<any | null> {
    this.vehicle = vehicle;
    this.newOrder = {
      vehicleId: vehicle.id,
      startAt: new Date(),
    };
    this.loading = false;
    this.error = null;

    this.visible = true;
    let promise = new Promise<any | null>(resolve => {
      this.resolve = resolve;
    });
    return promise;
  }

  getMyLocation() {
    var that = this;
    navigator.geolocation.getCurrentPosition(
      function showPosition(position) {
        that.newOrder.location = position.coords.latitude + "," + position.coords.longitude;
      },
      function error(e) {
        console.log(e);
      },
      { maximumAge: 50000, timeout: 20000, enableHighAccuracy: true }
    );
  }

  close() {
    this.resolve(null);
    this.visible = false;
  }

  save() {
    this.error = null;

    const result = validationEngine.validateGroup("formValidate");
    if (!result.isValid)
      return;

    this.loading = true;

    this.ordersService.insert(this.newOrder).then(res => {
      this.resolve(res);
      notify("Order booking is successful", "success", 2000);
      this.visible = false;
    }).catch(e => {
      this.error = e;
    }).finally(() => {
      this.loading = false;
    });
  }

  PRICE_MODEL = PRICE_MODEL;
  onFieldDataChanged(e: any) {
    if (this.newOrder?.startAt && this.newOrder?.endAt && this.vehicle?.priceModel == PRICE_MODEL.perHour) {
      var start = moment(this.newOrder.startAt);
      var end = moment(this.newOrder.endAt);
      this.newOrder.totalCost = this.vehicle.pricePerModel * moment.duration(end.diff(start)).asHours();
    }
    else if (this.newOrder?.distance && this.vehicle?.priceModel == PRICE_MODEL.perKM) {
      this.newOrder.totalCost = this.vehicle.pricePerModel * this.newOrder?.distance;
    }
  }

}
