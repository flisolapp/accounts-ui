import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '../../third/material/material.module';
import {ComponentsModule} from '../../components/components.module';
import {TranslateModule} from '@ngx-translate/core';
import {SignInComponent} from './sign-in.component';

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    TranslateModule
  ],
  exports: [
    SignInComponent
  ]
})
export class SignInModule {
}
