import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        MatIconModule,
        MatListModule,
        MatTabsModule,
        MatToolbarModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
