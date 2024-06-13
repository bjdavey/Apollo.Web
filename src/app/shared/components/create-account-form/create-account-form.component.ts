import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ValidationCallbackData } from 'devextreme-angular/common';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';
import { USER_TYPE, UserTypes } from '../../infrastructure/enums';
import { UsersService } from '../../data/users.service';


@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent {
  loading = false;
  formData: any = {};

  USER_TYPE = USER_TYPE;
  userTypesEditorOptions = {
    dataSource: [
      {
        id: USER_TYPE.provider,
        text: "Provider",
      },
      {
        id: USER_TYPE.customer,
        text: "Customer",
      },
    ],
    valueExpr: "id",
    displayExpr: "text",
    searchEnabled: true,
    placeholder: "Select a user type",
  };
  constructor(private authService: AuthService, private router: Router, private usersService: UsersService) { 
    this.emailValidation = this.emailValidation.bind(this);
  }

  emailValidation(e: any) {
    console.log(e);
    
    return new Promise<void>((resolve, reject) => {
      this.usersService.checkEmailUsed(0, e.value).then((usedBefore) => {
        usedBefore ? reject() : resolve();
      }).catch(error => {
        console.error(error);
        reject("Server Error");
      });
    });
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    // const { email, password } = this.formData;
    this.loading = true;

    // const result = await this.authService.createAccount(email, password);
    // this.loading = false;

    // if (result.isOk) {
    //   this.router.navigate(['/login-form']);
    // } else {
    //   notify(result.message, 'error', 2000);
    // }

    this.authService.insert(this.formData).then((result: any) => {
      if (result) {
        this.router.navigate(['/login-form']);
        notify("Account created successfully", 'success', 2000);
      }
    }).catch((error: any) => {
      notify(error.message, 'error', 2000);
    }).finally(() => { this.loading = false; });
  }

  confirmPassword = (e: ValidationCallbackData) => {
    return e.value === this.formData.password;
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [CreateAccountFormComponent],
  exports: [CreateAccountFormComponent]
})
export class CreateAccountFormModule { }
