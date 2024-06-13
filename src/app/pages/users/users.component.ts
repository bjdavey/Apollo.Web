import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxFormComponent } from 'devextreme-angular/ui/form';
import CustomStore from 'devextreme/data/custom_store';
import { alert } from 'devextreme/ui/dialog';
import { UsersService } from 'src/app/shared/data/users.service';
import { UserStatuses, UserTypes } from 'src/app/shared/infrastructure/enums';
import { LoggedUser } from 'src/app/shared/services/auth.service';
import { DataGridHelpers } from 'src/app/shared/utils/helpers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  constructor(private usersService: UsersService) {
    this.emailValidation = this.emailValidation.bind(this);
  }

  user = LoggedUser;

  UserStatuses = UserStatuses;
  UserTypes = UserTypes;

  roles = [
  ]

  DataGridHelpers = DataGridHelpers;
  dataSource: any;

  newItemForm = false;

  ngOnInit() {
    this.dataSource = this.usersService.createDataSource();
  }

  @ViewChild("grid", { static: false }) grid: DxDataGridComponent | undefined;

  onToolbarPreparing(e: any) {
    var toolbarItems = e.toolbarOptions.items;
    toolbarItems.push({
      widget: "dxButton",
      options: {
        text: "Add User",
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


  newUserType: number | undefined;
  onInitNewRow(e: any) {
    this.newItemForm = true;
    e.data.roles = JSON.stringify([]);
  }

  onEditorPreparing(e: any) {
    e.editorOptions.inputAttr = { 'autocomplete': "off" };
    if (e.parentType == "dataRow") {
      if (e.dataField == "password" || e.dataField == "password2") {
        e.editorOptions.mode = 'password';
        //e.cancel = !e.row.inserted;
        //e.editorOptions.visible = e.row.inserted;
      }
    }
  }

  onEditingStart(e: any) {
    this.newItemForm = false;
  }
  validationPassword(e: any) {
    return e.value === e.data.password;
  }

  getKeys(cellInfo: any) {
    var x = JSON.parse(cellInfo.value)
    return x;
  }
  keysChanged(e: any, cellInfo: any) {
    var v = e.component.option("selectedItemKeys");
    cellInfo.setValue(JSON.stringify(v));
  }


  //  -------changePassword Popup

  @ViewChild("form", { static: false }) form: DxFormComponent | undefined;

  changePasswordForm: { id: any; Password: any; Password2: any; } | undefined
  changePasswordPopupVisible = false
  loadIndicatorVisible = false;
  changePasswordPopup(e: any) {
    this.changePasswordForm = { id: e.data.id, Password: null, Password2: null }
    this.changePasswordPopupVisible = true;
  }
  changePassword() {
    this.loadIndicatorVisible = true;
    var result = this.form?.instance.validate();
    if (result?.isValid) {
      this.usersService.changeUserPassword(this.changePasswordForm?.id, this.changePasswordForm?.Password)
        .then((res) => {
          this.loadIndicatorVisible = false;
          if (res)
            alert("Done", "Success");
          else
            alert("Server Error", "Error");
          this.changePasswordPopupVisible = false;
        }).catch(error => {
          this.loadIndicatorVisible = false;
          console.error(error);
          alert("Server Error", "Error");
        });
    }
    else
      this.loadIndicatorVisible = false;
  }

  passwordComparison = () => {
    return this.form?.instance.option("formData").Password;
  };

  emailValidation(e: any) {
    return new Promise<void>((resolve, reject) => {
      this.usersService.checkEmailUsed(e.data.id, e.data.email).then((usedBefore) => {
        usedBefore ? reject() : resolve();
      }).catch(error => {
        console.error(error);
        reject("Server Error");
      });
    });
  }

}
