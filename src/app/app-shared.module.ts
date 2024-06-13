import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxListModule } from 'devextreme-angular/ui/list';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { BrowserModule } from '@angular/platform-browser';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxLookupModule } from 'devextreme-angular/ui/lookup';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { DxRadioGroupModule } from 'devextreme-angular/ui/radio-group';
import { DxFileUploaderModule } from 'devextreme-angular/ui/file-uploader';
import { DxSwitchModule } from 'devextreme-angular/ui/switch';
import { SafePipe } from './shared/pipes/safe/safe.pipe';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxTagBoxModule } from 'devextreme-angular/ui/tag-box';
import { CommonModule } from '@angular/common';
import { DxDateRangeBoxModule } from 'devextreme-angular/ui/date-range-box';
import { DxPivotGridModule } from 'devextreme-angular/ui/pivot-grid';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxVectorMapModule } from 'devextreme-angular/ui/vector-map';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { VehicleFormComponent } from './pages/vehicles/vehicle-form/vehicle-form.component';
import { DxColorBoxModule } from 'devextreme-angular/ui/color-box';
import { DxMapModule } from 'devextreme-angular/ui/map';
import { UsersComponent } from './pages/users/users.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { OrdersComponent } from './pages/orders/orders.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    DxDataGridModule,
    DxButtonModule,
    DxListModule,
    DxPopupModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxLoadPanelModule,
    DxToolbarModule,
    DxLookupModule,
    DxTextAreaModule,
    DxRadioGroupModule,
    DxFileUploaderModule,
    DxSwitchModule,
    DxTextBoxModule,
    DxTagBoxModule,
    DxDateRangeBoxModule,
    DxPivotGridModule,
    DxPieChartModule,
    DxChartModule,
    DxVectorMapModule,
    DxColorBoxModule,
    DxMapModule
  ],
  declarations: [
    SafePipe,
    HomeComponent,
    VehiclesComponent,
    VehicleFormComponent,
    UsersComponent,
    ProvidersComponent,
    CustomersComponent,
    OrdersComponent,
  ],
  exports: [
    // OrderDetailsComponent
  ]
})
export class AppSharedModule { }
