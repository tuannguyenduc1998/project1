import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appKzMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: KzMaskDirective,
    multi: true
  }]
})
export class KzMaskDirective implements ControlValueAccessor {

  onTouched: any;
  onChange: any;

  @Input() kzMask: string;
  @Output() retornoKzMask = new EventEmitter();

  constructor() { }

  writeValue(value: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    // codigo
    var valor = $event.target.value.replace(/\D/g, '');
    var pad = this.kzMask.replace(/\D/g, '').replace(/9/g, '_');
    var valorMask = valor + pad.substring(0, pad.length - valor.length);

    // retorna caso pressionado backspace
    if ($event.keyCode === 8) {
      this.onChange(valor);
      return;
    }

    if (valor.length <= pad.length) {
      this.onChange(valor);
    }

    var valorMaskPos = 0;
    valor = '';
    for (var i = 0; i < this.kzMask.length; i++) {
      if (isNaN(parseInt(this.kzMask.charAt(i)))) {
        valor += this.kzMask.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }

    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }

    $event.target.value = valor;
    this.retornoKzMask.emit($event.target.value);
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    // codigo
    if ($event.target.value.length === this.kzMask.length) {
      return;
    }
    this.onChange('');
    $event.target.value = '';
    this.retornoKzMask.emit($event.target.value);
  }

}
