import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = '1.Introduction';
  myBtn: string = 'My button';
  description: string = 'This is my first angular app';
  counter: number = 0;

  //attr binding
  isDisabled: boolean = false;

  //image binding
  angularImage: string = 'assets/angular16.webp';

  //style binding
  bgColor: string = 'green';
  titleColor: string = 'white';
  descriptionStyle: string = 'font-size:30px; color:lightblue';

  //class binding
  redText: boolean = true;
  blueText: string = 'yes';

  //event binding
  incrementCounter() {
    this.counter++;
  }

  //two way data binding
  inputText: string = 'Initial Value';

  //ngClass
  classes: string = 'danger text-size';
  message: string = 'This is a dangerous message';

  //ngStyle
  selectedColor: string = 'red';
}
