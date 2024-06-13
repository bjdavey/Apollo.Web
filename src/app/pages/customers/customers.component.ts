import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { CustomersService } from 'src/app/shared/data/customers.service';
import { UserStatuses, VehicleStatuses } from 'src/app/shared/infrastructure/enums';
import { LoggedUser } from 'src/app/shared/services/auth.service';
import { DataGridHelpers } from 'src/app/shared/utils/helpers';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  
  constructor(private customersService: CustomersService) {
  }

  user = LoggedUser;

  UserStatuses = UserStatuses;

  DataGridHelpers = DataGridHelpers;
  dataSource: any;

  ngOnInit() {
    this.dataSource = this.customersService.createDataSource();
  }

  @ViewChild("grid", { static: false }) grid: DxDataGridComponent | undefined;

  onToolbarPreparing(e: any) {
  }


  onEditorPreparing(e: any) {
  }

}
