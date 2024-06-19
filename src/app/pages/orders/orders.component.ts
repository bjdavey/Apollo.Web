import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { OrdersService } from 'src/app/shared/data/orders.service';
import { OrderStatuses } from 'src/app/shared/infrastructure/enums';
import { LoggedUser } from 'src/app/shared/services/auth.service';
import { DataGridHelpers } from 'src/app/shared/utils/helpers';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  constructor(private ordersService: OrdersService) {
  }

  user = LoggedUser;

  OrderStatuses = OrderStatuses;

  DataGridHelpers = DataGridHelpers;
  dataSource: any;

  ngOnInit() {
    this.dataSource = this.ordersService.createDataSource();
  }

  @ViewChild("grid", { static: false }) grid: DxDataGridComponent | undefined;

  onToolbarPreparing(e: any) {
  }


  onEditorPreparing(e: any) {
  }

}
