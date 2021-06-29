import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { CustomInputComponent } from './custom-input/custom-input.component';
import { SpinnerComponent } from './spinner/spinner.component';

const COMPONENTS = [CustomInputComponent, SpinnerComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [SharedModule],
  exports: [COMPONENTS],
  providers: [],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UIModule {}
