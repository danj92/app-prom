import {
  HttpClient,
  HttpParameterCodec,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

// Default codec doesn't encode characters reserved in url format like '+' or '?'. This custom implementation uses native browser functions to encode the params.

class HttpQueryEncoderCodec implements HttpParameterCodec {
  encodeKey(k: string): string {
    return encodeURIComponent(k);
  }

  encodeValue(v: string): string {
    return encodeURIComponent(v);
  }

  decodeKey(k: string): string {
    return decodeURIComponent(k);
  }

  decodeValue(v: string): string {
    return decodeURIComponent(v);
  }
}

@Injectable()
export class ApiService {
  URL_PATH = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  private buildParams(params: any = {}) {
    params = params || {};
    let searchParams = new HttpParams({
      encoder: new HttpQueryEncoderCodec(),
    });

    for (const [key, param] of Object.entries<any>(params)) {
      if (Array.isArray(param)) {
        for (const value of param) {
          searchParams = searchParams.append(key, value);
        }
      } else if (param !== undefined) {
        searchParams = searchParams.set(key, param);
      }
    }
    return searchParams;
  }

  get<T>(url: string, params: any = {}): Promise<T> {
    const searchParams = this.buildParams(params);

    return this.http
      .get<T>(`${this.URL_PATH}${url}`, {
        params: searchParams,
      })
      .toPromise();
  }

  getObs<T>(url: string, params: any = {}): Observable<T> {
    const searchParams = this.buildParams(params);

    return this.http.get<T>(`${this.URL_PATH}${url}`, {
      params: searchParams,
    });
  }

  post<T>(url: string, body: any = null, params: any = {}) {
    const searchParams = this.buildParams(params);

    return this.http
      .post<T>(`${this.URL_PATH}${url}`, body, {
        params: searchParams,
      })
      .toPromise();
  }

  postObs<T>(url: string, body: any = null, params: any = {}) {
    const searchParams = this.buildParams(params);

    return this.http.post<T>(`${this.URL_PATH}${url}`, body, {
      params: searchParams,
    });
  }

  patch<T>(url: string, body: any) {
    return this.http.patch<T>(`${this.URL_PATH}${url}`, body).toPromise();
  }

  put<T>(url: string, body: any) {
    return this.http.put<T>(`${this.URL_PATH}${url}`, body).toPromise();
  }

  delete<T>(url: string) {
    return this.http.delete<T>(`${this.URL_PATH}${url}`).toPromise();
  }
}
