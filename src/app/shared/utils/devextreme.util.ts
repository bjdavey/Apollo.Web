import { HttpParams } from "@angular/common/http";

export function reformatDxHttpParams(loadOptions) {
  let params: HttpParams = new HttpParams();
  [
    "skip",
    "take",
    "sort",
    "filter",
    "select",
    "searchExpr",
    "searchOperation",
    "searchValue",
    "group",
    "requireTotalCount",
  ].forEach(function (i) {
    if (
      i in loadOptions &&
      loadOptions[i] !== undefined &&
      loadOptions[i] !== null &&
      loadOptions[i] !== ""
    )
      params = params.set(i, JSON.stringify(loadOptions[i]));
  });
  return params;
}
