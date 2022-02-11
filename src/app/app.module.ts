import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NarrowWindowComponent } from './narrow-window/narrow-window.component';
import { TopBarComponent } from './narrow-window/top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NarrowWindowComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
