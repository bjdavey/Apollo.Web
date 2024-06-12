import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { VehiclesService } from 'src/app/shared/data/vehicles.service';
import { DataGridHelpers } from 'src/app/shared/utils/helpers';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {

  constructor(private vehiclesService: VehiclesService) {
    this.deviceUniqueValidation = this.deviceUniqueValidation.bind(this);
  }

  DataGridHelpers = DataGridHelpers;
  dataSource: any;
  newItemForm = false;

  codePattern: any = /^[0-9a-zA-Z@.]+$/;
  deviceUniqueValidation(e: any) {
    return new Promise<void>((resolve, reject) => {
      this.vehiclesService.checkDeviceUniqueUsed(e.data.id, e.data.deviceUnique).then((usedBefore) => {
        usedBefore ? reject() : resolve();
      }).catch(error => {
        console.error(error);
        reject("Server error");
      });
    });
  }

  showDetails(e: any) {
    if (e.data) {
      this.vehiclesService.getVehicleDetails(e.data.id).then((res: any) => {
        console.log(res);
      });
    }
  }

  ngOnInit() {
    this.dataSource = this.vehiclesService.createDataSource();
  }

  @ViewChild("grid", { static: false }) grid: DxDataGridComponent | undefined;

  onToolbarPreparing(e: any) {
    var toolbarItems = e.toolbarOptions.items;
    toolbarItems.push({
      widget: "dxButton",
      options: {
        text: "Add",
        icon: "add",
        type: "default",
        stylingMode: "contained",
        onClick: function (ee: any) {
          e.component.addRow();
        }
      },
      location: "after",
      locateInMenu: "auto"
    });
  }

}
