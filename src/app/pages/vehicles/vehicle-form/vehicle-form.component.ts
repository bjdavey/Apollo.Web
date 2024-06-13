import { Component } from '@angular/core';
import { VehiclesService } from 'src/app/shared/data/vehicles.service';
import { GetFileURL, GetObjectsDifference } from 'src/app/shared/utils/helpers';
import validationEngine from 'devextreme/ui/validation_engine';
import { Brands, VehiclePriceModels, VehicleStatuses, VehicleTypes, Years } from 'src/app/shared/infrastructure/enums';
import * as moment from 'moment';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent {

  moment = moment;

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

  formData: any;
  deviceData: any = {};
  initData: any;
  isNewRecord = true;
  isChanged = true;
  loading = false;
  error = null;


  constructor(private vehiclesService: VehiclesService) {
    this.save = this.save.bind(this);
    this.close = this.close.bind(this);
    this.deviceUniqueValidation = this.deviceUniqueValidation.bind(this);
  }

  ngOnInit(): void {
  }

  show(isNewRecord: boolean, formData: any, id: number = 0): Promise<any | null> {
    this.formData = formData;
    this.initData = JSON.parse(JSON.stringify(formData));
    this.isNewRecord = isNewRecord;
    this.isChanged = isNewRecord;
    this.loading = false;
    this.error = null;

    if (!isNewRecord) {
      this.loading = true;
      this.vehiclesService.getVehicleDetails(id).then((res: any) => {
        console.log(res);
        
        this.formData = res?.vehicle;
        this.deviceData = res?.device;
        this.initData = JSON.parse(JSON.stringify(res));
      }).catch(e => {
        this.error = e;
      }).finally(() => {
        this.loading = false;
      });
    }

    this.visible = true;
    let promise = new Promise<any | null>(resolve => {
      this.resolve = resolve;
    });
    return promise;
  }

  close() {
    this.resolve(null);
    this.visible = false;
  }

  onFieldDataChanged(e: any) {
    if (!this.isNewRecord) {
      let changes = GetObjectsDifference(this.initData, this.formData);
      this.isChanged = changes && Object.keys(changes).length > 0;
    }
  }

  save() {
    this.error = null;

    const result = validationEngine.validateGroup("formValidate");
    if (!result.isValid)
      return;

    this.loading = true;

    var res: Promise<any>;
    if (this.isNewRecord)
      res = this.vehiclesService.insertWithFile(this.formData, this.picFile);
    else {
      // console.log(this.initData);
      // console.log(this.formData);
      let changes = GetObjectsDifference(this.initData, this.formData);
      // console.log(changes);
      res = this.vehiclesService.updateWithFile(this.formData.id, changes, this.picFile);
    }

    res.then(res => {
      this.resolve(res);
      this.visible = false;
    }).catch(e => {
      this.error = e;
    }).finally(() => {
      this.loading = false;
    });
  }

  codePattern: any = /^[0-9a-zA-Z@.]+$/;
  deviceUniqueValidation(e: any) {
    return new Promise<void>((resolve, reject) => {
      this.vehiclesService.checkDeviceUniqueUsed(e.data?.id, e.value).then((usedBefore) => {
        usedBefore ? reject() : resolve();
      }).catch(error => {
        console.error(error);
        reject("Server error");
      });
    });
  }

  allowedFileExtensions = ['.jpg', '.jpeg', '.png'];
  picFile: File | any = null;
  picSrcTmp: any = null;
  fileEditorOptions: any = {
    accept: "image/*",
    maxFileSize: 4000000,
    multiple: false,
    allowedFileExtensions: this.allowedFileExtensions,
    uploadMode: "useForm",
    onValueChanged: (e: any) => {
      this.picFile = null;
      this.picSrcTmp = null;
      if (e.value.length > 0) {
        var file: File = e.value[0];
        var extension = "." + file?.name?.split(".")?.pop()?.toLowerCase();
        if (this.allowedFileExtensions.includes(extension) && file.size <= 4000000) {
          this.picFile = file;
          this.picSrcTmp = URL.createObjectURL(file);
          this.formData.dump = "dump"; //for triggering the update method of the dataSource
        }
      }
    }
  }

  // onEditorPreparing(e: any) {
  //   if (e.parentType == "dataRow") {
  //     if (e.dataField == "pictureFile") {
  //       this.picFile = null;
  //       console.log(e.row.data.picture)
  //       this.picSrcTmp = e.row.data.picture ? GetFileURL(e.row.data.picture) : null;
  //       e.editorName = "dxFileUploader";
  //       e.editorOptions.accept = "image/*";
  //       e.editorOptions.maxFileSize = 4000000;
  //       e.editorOptions.multiple = false;
  //       e.editorOptions.allowedFileExtensions = this.allowedFileExtensions;
  //       e.editorOptions.invalidFileExtensionMessage = "invalidFileExtensionMessage";
  //       e.editorOptions.invalidMaxFileSizeMessage = "invalidMaxFileSizeMessage";
  //       e.editorOptions.uploadMode = "useForm";
  //       var that = this;
  //       var onValueChanged = e.editorOptions.onValueChanged;
  //       e.editorOptions.onValueChanged = function (ee: any) {
  //         onValueChanged.call(this, e);
  //         that.picFile = null;
  //         that.picSrcTmp = null;
  //         if (ee.value.length > 0) {
  //           var file: File = ee.value[0];
  //           var extension = "." + file?.name?.split(".")?.pop()?.toLowerCase();
  //           if (that.allowedFileExtensions.includes(extension) && file.size <= 4000000) {
  //             that.picFile = file;
  //             that.picSrcTmp = URL.createObjectURL(file);
  //             e.setValue("dump_string"); //for triggering the update method of the dataSource
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

}
