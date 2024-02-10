import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = '6.Forms';

  user: { name: string; email: string } = {
    name: '',
    email: '',
  };

  // Define the submitForm method
  submitForm(form: NgForm) {
    if (form.valid) {
      console.log(form.value, this.user);
      this.user = form.value;
      form.reset(); // Reset the form after submission
    }
  }

  validateEmail() {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(this.user.email);
  }
}
