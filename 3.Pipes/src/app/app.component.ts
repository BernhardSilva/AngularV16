import { Component, Pipe } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = '3.Pipes';
  appendText = 'Hello'

  today: number = Date.now();

  currency: number = 1.34;
  percent: number = 6.45;
}
