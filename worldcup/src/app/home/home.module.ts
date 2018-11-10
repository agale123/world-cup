import { MapComponent } from './../map/map.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    }
];

@NgModule({
    imports: [
        HttpClientModule,
        RouterModule.forChild(routes),
    ],
    declarations: [HomeComponent, MapComponent],
})
export class HomeModule { }
