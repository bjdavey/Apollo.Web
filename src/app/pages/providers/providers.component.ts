import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { ProvidersService } from 'src/app/shared/data/providers.service';
import { UserStatuses, VehicleStatuses } from 'src/app/shared/infrastructure/enums';
import { LoggedUser } from 'src/app/shared/services/auth.service';
import { DataGridHelpers } from 'src/app/shared/utils/helpers';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent {

  
  constructor(private providersService: ProvidersService) {
  }

  user = LoggedUser;

  UserStatuses = UserStatuses;

  vehicleStatusEditorOptions = {
    dataSource: VehicleStatuses,
    valueExpr: "id",
    displayExpr: "text",
    searchEnabled: true,
  };
  
  DataGridHelpers = DataGridHelpers;
  dataSource: any;

  ngOnInit() {
    this.dataSource = this.providersService.createDataSource();
  }

  @ViewChild("grid", { static: false }) grid: DxDataGridComponent | undefined;

  onToolbarPreparing(e: any) {
  }


  onEditorPreparing(e: any) {
  }

}
