import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent implements OnInit {
  DELAY_TIME = 500;

  @HostBinding('class.is-visible')
  visible = false;

  @Input() delayed = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.delayed) {
      setTimeout(() => {
        this.visible = true;
        this.cdr.markForCheck();
      }, this.DELAY_TIME);
    } else {
      this.visible = true;
    }
  }
}
