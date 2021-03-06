import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from 'app/user-details/user-details.component';
import { LandingPageComponent } from './landing-page.component';

export const landingPage: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(landingPage)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
