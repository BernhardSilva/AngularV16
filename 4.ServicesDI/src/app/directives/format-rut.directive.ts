import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formatRutDirective]',
})
export class FormatRutDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent): void {
    let rut = this.el.nativeElement.value;
    let cleanedRut = this.cleanRut(rut);

    if (!this.validateRut(cleanedRut)) {
      this.control.control?.setErrors({ invalid: true });
      return;
    }

    this.control.control?.setErrors(null);
    const formattedRut = this.formatRut(cleanedRut);
    this.control.control?.setValue(formattedRut, { emitEvent: false });
  }

  cleanRut(rut: string): string {
    return typeof rut === 'string'
      ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
      : '';
  }

  validateRut(rut: string): boolean {
    if (/^0+/.test(rut)) {
      return false;
    }
    if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) {
      return false;
    }
    const cleanedRut = this.cleanRut(rut);

    let rutNumbers = parseInt(cleanedRut.slice(0, -1), 10);
    const rutLastDigit = cleanedRut.slice(-1);
    let M = 0,
      S = 1;
    for (; rutNumbers; rutNumbers = Math.floor(rutNumbers / 10))
      S = (S + (rutNumbers % 10) * (9 - (M++ % 6))) % 11;
    const lastDigitValid = (S ? S - 1 : 'K').toString();
    return lastDigitValid === rutLastDigit;
  }

  formatRut(rut: string, withDots: boolean = true): string {
    let rutFormatted;
    if (withDots) {
      rutFormatted = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1);
      for (let i = 4; i < rut.length; i += 3) {
        rutFormatted = rut.slice(-3 - i, -i) + '.' + rutFormatted;
      }
    } else {
      rutFormatted = rut.slice(0, -1) + '-' + rut.substr(rut.length - 1);
    }

    return rutFormatted;
  }
}
