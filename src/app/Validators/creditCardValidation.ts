import { AbstractControl } from '@angular/forms';

export function numberValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const validate = /[\D]/.test(control.value);
  return validate ? { numberError: { value: control.value } } : null;
}

export function nameValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const validate = /[!@#$%^&*(),.?":{}|<>0-9]/.test(control.value);
  return validate ? { nameError: { value: control.value } } : null;
}
