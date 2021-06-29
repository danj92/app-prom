import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UIModule } from 'app/ui/ui.module';
import { LandingPageApiService } from './landing-page-api-service';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageRoutingModule } from './landing-page.routing';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [LandingPageRoutingModule, UIModule, SharedModule],
  providers: [LandingPageApiService],
})
export class LandingPageModule {}
