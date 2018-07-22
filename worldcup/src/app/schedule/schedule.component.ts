import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { GAMES } from '../data';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
    readonly games = GAMES;

    readonly displayedColumns: string[] = ['city', 'date'];

    constructor() {}
}
