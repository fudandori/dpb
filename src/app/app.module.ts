import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuilderComponent } from './builder/builder.component';
import { DesignerComponent } from './designer/designer.component';
import {FormsModule} from '@angular/forms';
import {NgxElectronModule} from 'ngx-electron';

@NgModule({
  declarations: [
    AppComponent,
    BuilderComponent,
    DesignerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
