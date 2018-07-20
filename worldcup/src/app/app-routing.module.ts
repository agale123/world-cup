import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItineraryComponent } from './itinerary/itinerary.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'schedule', component: ScheduleComponent },
    { path: 'itinerary', component: ItineraryComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
