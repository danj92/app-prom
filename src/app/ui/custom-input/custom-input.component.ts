import {
  Component,
  HostBinding,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Injector,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { isControlRequired } from '../custom-control-helper';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomInputComponent,
      multi: true,
    },
  ],
})
export class CustomInputComponent
  implements ControlValueAccessor, AfterViewInit
{
  @Input() placeholder: string;

  @HostBinding('class.required')
  public required = false;

  @ViewChild('input', { static: true, read: ElementRef })
  inputElementRef: ElementRef;

  private control: FormControl;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (_: any) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  constructor(private _renderer: Renderer2, private injector: Injector) {}

  ngAfterViewInit() {
    const ngControl = this.injector.get(NgControl, null);
    if (ngControl) {
      this.control = ngControl.control as FormControl;
      setTimeout(() => {
        this.required = isControlRequired(this.control);
      });
    }
  }

  writeValue(value: string) {
    this._renderer.setProperty(
      this.inputElementRef.nativeElement,
      'value',
      value
    );
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(
      this.inputElementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }

  onBlur() {
    this.onTouched();
  }

  onInputChange() {
    const value = this.inputElementRef.nativeElement.value;
    this.onChange(value);
  }
}
