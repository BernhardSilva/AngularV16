import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessageService } from './services/error-message.service';

enum FormLabels {
  name = 'Name',
  email = 'Email',
  password = 'Password',
  street = 'Street',
  city = 'City',
  phoneNumber = 'Phone Number',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = '7.ReactiveForms';
  formLabels = FormLabels;
  userForm!: FormGroup;
  errorMessages: string[] = []; // Array to hold error messages

  constructor(
    private fb: FormBuilder,
    private errorMessageService: ErrorMessageService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          ),
        ],
      ],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
      }),
      phoneNumbers: this.fb.array([
        this.fb.control('', [
          Validators.required,
          Validators.pattern(/^\d{10}$/),
        ]),
      ]),
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required,
          Validators.pattern(/^(?=.*\d).{3,}$/),
        ],
      ],
    });
  }

  get phoneNumbers() {
    return this.userForm.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber() {
    this.phoneNumbers.push(
      this.fb.control('', [Validators.required, Validators.pattern(/^\d{10}$/)])
    );
  }
  removePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index);
  }

  submitForm() {
    this.userForm.valid && console.log(this.userForm.value);
    // if (this.userForm.invalid) {
    //   //error message handler
    //   this.errorMessages = Object.keys(this.userForm.controls).flatMap(
    //     (key) => {
    //       const control = this.userForm.get(key);
    //       return control?.errors
    //         ? Object.entries(control.errors).map(([errorKey, errorValue]) =>
    //             this.errorMessageService.generateErrorMessage(
    //               key,
    //               errorKey,
    //               errorValue
    //             )
    //           )
    //         : [];
    //     }
    //   );
    //   //alert(this.errorMessages.join('\n')); // Display errors in an alert
    // } else {
    //   console.log(this.userForm.value);
    //   this.errorMessages = [];
    // }
  }
}
