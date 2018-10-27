import { TableModule } from './../table/table.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ItineraryComponent } from './itinerary.component';
// tslint:disable-next-line:max-line-length
import { MatCardModule, MatIconModule, MatExpansionModule, MatSelectModule, MatDividerModule, MatInputModule, MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: ItineraryComponent,
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        RouterModule.forChild(routes),
        MatIconModule,
        MatExpansionModule,
        MatSelectModule,
        MatDividerModule,
        MatCardModule,
        TableModule,
    ],
    declarations: [ItineraryComponent],
})
export class ItineraryModule { }
