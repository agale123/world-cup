import { Component } from '@angular/core';
import { CITIES, TEAMS } from '../data';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
    readonly games;
    readonly displayedColumns: string[] = ['id', 'home', 'away', 'city', 'date'];

    teams = new FormControl();
    readonly teamList: string[] = TEAMS;
    teamChanges = this.teams.valueChanges.pipe(startWith([]));

    cities = new FormControl();
    readonly cityList: string[] = CITIES;
    cityChanges = this.cities.valueChanges.pipe(startWith([]));

    readonly hasNoFilter;

    constructor(private readonly dataService: DataService) {
        this.games = combineLatest(this.teamChanges, this.cityChanges,
            (teamChanges, cityChanges) => {
                return dataService.games.filter(game => {
                    const home = this.dataService.formatTeam(game.home);
                    const away = this.dataService.formatTeam(game.away);
                    const isCityMatch = cityChanges.length === 0
                        || cityChanges.indexOf(game.city) >= 0;
                    const isTeamMatch = teamChanges.length === 0
                        || teamChanges.indexOf(home) >= 0
                        || teamChanges.indexOf(away) >= 0;
                    return isCityMatch && isTeamMatch;
                });
            });

        this.hasNoFilter = combineLatest(this.teamChanges, this.cityChanges,
            (teamChanges, cityChanges) => {
                return teamChanges.length === 0 && cityChanges.length === 0;
            });
    }

    formatDate(dateString: Date): string {
        const date = new Date(dateString);
        const month = date.getMonth() === 6 ? 'June' : 'July';
        const day = date.getDate().toString();
        const hour = (date.getHours() % 12).toString();
        const minutes = date.getMinutes() === 0 ? '00' : '30';
        const post = date.getHours() > 12 ? 'PM' : 'AM';
        return `${month} ${day}, ${hour}:${minutes} ${post}`;
    }
}
