import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UIModule } from 'app/ui/ui.module';
import { UserDetailsComponent } from 'app/user-details/user-details.component';
import { LandingPageApiService } from './landing-page-api-service';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageRoutingModule } from './landing-page.routing';

@NgModule({
  declarations: [LandingPageComponent, UserDetailsComponent],
  imports: [LandingPageRoutingModule, UIModule, SharedModule],
  providers: [LandingPageApiService],
})
export class LandingPageModule {}
