import { Injectable } from '@angular/core';

import { ApiService } from 'app/core/api.service';

@Injectable()
export class LandingPageApiService extends ApiService {
  private readonly peopleUrl = '/people/';

  autocomplete(params: string) {
    return super.get<any[]>(`${this.peopleUrl}?search=${params}`);
  }

  getPeople(params = {}): Promise<any[]> {
    return super.get<any[]>(`${this.peopleUrl}`, params);
  }

  postPeople(body: any): Promise<any[]> {
    return super.post<any[]>(this.peopleUrl, body);
  }

  patchPeople(id: number, body: any): Promise<any> {
    return super.patch<any>(`${this.peopleUrl}${id}`, body);
  }

  putPeople(id: number, body: any): Promise<any> {
    return super.put<any>(`${this.peopleUrl}${id}`, body);
  }

  deletePeople(id: number) {
    return super.delete<any[]>(`${this.peopleUrl}${id}`);
  }
}
