import { Component } from '@angular/core';
import { CITIES, TEAMS } from '../data';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
    readonly games;
    readonly displayedColumns: string[] = ['home', 'away', 'city', 'date'];

    teams = new FormControl();
    readonly teamList: string[] = TEAMS;
    teamChanges = this.teams.valueChanges;

    cities = new FormControl();
    readonly cityList: string[] = CITIES;
    cityChanges = this.cities.valueChanges;

    constructor(dataService: DataService) {
        this.games = dataService.games;
    }
}
