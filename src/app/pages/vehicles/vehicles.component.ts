import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { VehiclesService } from 'src/app/shared/data/vehicles.service';
import { Brands, VEHICLE_STATUS, VehicleTypes } from 'src/app/shared/infrastructure/enums';
import { DataGridHelpers, GetFileURL } from 'src/app/shared/utils/helpers';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {

  constructor(private vehiclesService: VehiclesService) {
    // this.deviceUniqueValidation = this.deviceUniqueValidation.bind(this);
  }

  DataGridHelpers = DataGridHelpers;
  dataSource: any;
  newItemForm = false;

  Brands = Brands;
  Types = VehicleTypes;

  getFileURL = GetFileURL;

  // codePattern: any = /^[0-9a-zA-Z@.]+$/;
  // deviceUniqueValidation(e: any) {
  //   return new Promise<void>((resolve, reject) => {
  //     this.vehiclesService.checkDeviceUniqueUsed(e.data.id, e.data.deviceUnique).then((usedBefore) => {
  //       usedBefore ? reject() : resolve();
  //     }).catch(error => {
  //       console.error(error);
  //       reject("Server error");
  //     });
  //   });
  // }

  @ViewChild("vehicleForm", { static: false }) vehicleForm: VehicleFormComponent | undefined;
  addRow() {
    this.vehicleForm?.show(true, {
      status: VEHICLE_STATUS.active,
    }).then((res: any) => {
      if (res) {
        this.grid?.instance.refresh(true);
      }
    });
  }

  editRow = (e: any) => {
    this.vehicleForm?.show(false, {}, e.row?.data?.id ).then((res: any) => {
      if (res) {
        this.grid?.instance.refresh();
      }
    });
  };

  showDetails(e: any) {
    if (e.data) {
      this.vehicleForm?.show(false, {}, e?.data?.id).then((res: any) => {
      });
    }
  }

  ngOnInit() {
    this.dataSource = this.vehiclesService.createDataSource();
  }

  @ViewChild("grid", { static: false }) grid: DxDataGridComponent | undefined;

  onToolbarPreparing(e: any) {
    var that = this;
    var toolbarItems = e.toolbarOptions.items;
    toolbarItems.push({
      widget: "dxButton",
      options: {
        text: "Add",
        icon: "add",
        type: "default",
        stylingMode: "contained",
        onClick: function (ee: any) {
          that.addRow();
        }
      },
      location: "after",
      locateInMenu: "auto"
    });
  }

}
