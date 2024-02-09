import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//two way binding
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
//two way binding, forms need to be added into imports
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
