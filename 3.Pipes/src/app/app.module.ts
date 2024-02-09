import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppendPipe } from './pipes/append.pipe';
import { CustomPercentPipe } from './pipes/custom-percent.pipe';

@NgModule({
  declarations: [AppComponent, AppendPipe, CustomPercentPipe],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
