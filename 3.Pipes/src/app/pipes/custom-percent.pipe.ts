import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPercent',
})
export class CustomPercentPipe implements PipeTransform {
  transform(value: number): string {
    return `${value.toFixed(2)}%`;
  }
}
