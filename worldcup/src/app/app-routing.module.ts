import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'schedule',
        loadChildren: './schedule/schedule.module#ScheduleModule'
    },
    {
        path: 'itinerary',
        loadChildren: './itinerary/itinerary.module#ItineraryModule'
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
