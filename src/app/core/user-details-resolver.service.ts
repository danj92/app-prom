import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LandingPageApiService } from 'app/landing-page/landing-page-api-service';

@Injectable()
export class UserDetailsResolverService implements Resolve<any> {
  constructor(private landingPageApiService: LandingPageApiService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params.id;

    if (id) {
      return this.landingPageApiService.getPeople(id);
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Wystąpił nieoczekiwany błąd.');
    } else {
      if (error.status === 404) {
        console.log('Client erro');
      }
    }
    console.log('Erro');
  }
}
