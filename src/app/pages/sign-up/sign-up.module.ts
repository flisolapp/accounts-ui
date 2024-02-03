import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '../../third/material/material.module';
import {ComponentsModule} from '../../components/components.module';
import {TranslateModule} from '@ngx-translate/core';
import {SignUpComponent} from './sign-up.component';

@NgModule({
  declarations: [
    SignUpComponent
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
    SignUpComponent
  ]
})
export class SignUpModule {
}
