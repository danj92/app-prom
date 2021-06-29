import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { LandingPageApiService } from './landing-page-api-service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  DEBOUNCE_TIME = 500;

  isLoading = false;

  lists: any; // TODO ref interface

  id: number;

  @ViewChild('searchInput')
  input: ElementRef;

  constructor(
    private landingPageApiService: LandingPageApiService,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngAfterViewInit() {
    const keyup$ = fromEvent<any>(this.input.nativeElement, 'keyup').pipe(
      map((event) => {
        return event.target.value;
      }),
      debounceTime(this.DEBOUNCE_TIME),
      distinctUntilChanged()
    );

    const paste$ = fromEvent<any>(this.input.nativeElement, 'paste').pipe(
      map((event) => {
        return event.clipboardData.getData('text').toLowerCase();
      })
    );

    const allEvents$ = merge(keyup$, paste$);

    allEvents$.subscribe((value) => {
      if (value.length === 0) {
        this.lists = [];
        return;
      }
      this.fetchData(value);
    });
  }

  // fix any
  async fetchData(value: string) {
    if (!!value && value.length > 0) {
      try {
        this.isLoading = true;
        const data: any = await this.landingPageApiService.autocomplete(value);
        this.lists = data.results;
        this.isLoading = false;
      } catch (e) {
        throw new Error('Error');
      }
    }
  }

  // fix any
  select(event: any, list: any) {
    this.lists = [];
    this.renderer.setProperty(
      this.input?.nativeElement,
      'value',
      event.srcElement.innerText
    );

    this.id = list.url.match(/\d+/)[0];

    console.log(this.id);

    this.router.navigate([`${this.id}`]);
  }
}
