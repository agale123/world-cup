import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ItineraryComponent } from './itinerary/itinerary.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ScheduleComponent,
        ItineraryComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatSidenavModule,
        MatTabsModule,
        MatToolbarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
