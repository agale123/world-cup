import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { GAMES } from '../data';
import {DataService} from '../data.service';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
    readonly games;

    readonly displayedColumns: string[] = ['home', 'away', 'city', 'date'];

    constructor(dataService: DataService) {
        this.games = dataService.games;
    }
}
