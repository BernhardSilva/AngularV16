import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  errorMessagesMap: {
    [key: string]: (key: string, error: { requiredLength?: number }) => string;
  } = {
    required: (key: string, _: any) => `${key} is required`,
    email: (key: string, _: any) => `${key} must be a valid email address`,
    minlength: (key: string, error: any) =>
      `${key} must be at least ${error.requiredLength} characters`,
    maxlength: (key: string, error: any) =>
      `${key} must not exceed ${error.requiredLength} characters`,
    pattern: (key: string, _: any) => {
      if (key === 'email') {
        return `${key} must be valid, example: gobierno@gob.cl`;
      } else if (key === 'password') {
        return `${key} must be words and must contain at least 3 numbers`;
      } else {
        return `${key} must be valid`;
      }
    },
  };

  generateErrorMessage(
    key: string,
    errorKey: string,
    errorValue: { requiredLength?: number }
  ) {
    const messageGenerator = this.errorMessagesMap[errorKey];
    return messageGenerator
      ? messageGenerator(key, errorValue)
      : `${key} is invalid.`;
  }

  constructor() {}
}
