import { ScheduleResolver } from './../schedule-resolver.service';
import { TableModule } from './../table/table.module';
import { FilterChipComponent } from './filter-chip/filter-chip.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ScheduleComponent } from './schedule.component';
import { MatIconModule, MatChipsModule, MatExpansionModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: ScheduleComponent,
        resolve: {schedule: ScheduleResolver},
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatIconModule,
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        TableModule,
    ],
    declarations: [ScheduleComponent, FilterChipComponent],
})
export class ScheduleModule { }
