import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumber',
})
export class CardNumberPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .replace(/[^\d]/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }
}
