import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

export interface UserInfo {
  id: number,
  email: string,
  name: string,
  type: USER_TYPE,
  roles: number[]
}

export enum USER_TYPE {
  admin = 1,
  operation = 2,
  provider = 3,
  customer = 4,
}

export interface IFormItem {
  field: string,
  label: string,
  editorType: "dxTextBox" | "dxSelectBox" | "dxNumberBox" | "dxTextArea" | "dxDateBox",
  editorOptions: any
}