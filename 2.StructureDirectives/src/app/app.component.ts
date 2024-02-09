import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Structure Directives';

  isLoggedIn: boolean = true;

  username: string = 'Bernhard';

  names: string[] = ['Bernhard', 'Lisa', 'Laura'];

  grade: string = '';
}
