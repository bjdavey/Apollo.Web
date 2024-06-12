import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

export interface UserInfo {
  id: number,
  email: string,
  name: string,
  roles: number[]
}

export interface IFormItem {
  field: string,
  label: string,
  editorType: "dxTextBox" | "dxSelectBox" | "dxNumberBox" | "dxTextArea" | "dxDateBox",
  editorOptions: any
}