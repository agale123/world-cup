import { Component } from '@angular/core';
import { CITIES, TEAMS, Team } from '../data';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

export interface Prediction {
    team: string;
    position: number;
}

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

    predictionPosition;
    predictionTeam;
    readonly positionList = ['1', '2'];

    readonly predictions = new BehaviorSubject<Prediction[]>([]);

    readonly hasNoFilter;

    isSubmitDisabled = true;

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

    updateSubmit() {
        if (!this.predictionPosition || !this.predictionTeam) {
            this.isSubmitDisabled = true;
            return;
        }
        const predictions = this.predictions.getValue();
        const newGroup = this.dataService.getGroup(this.predictionTeam);
        for (const prediction of predictions) {
            const group = this.dataService.getGroup(prediction.team as any);
            if (group === newGroup
                && prediction.position === this.predictionPosition) {
                this.isSubmitDisabled = true;
                return;
            }
        }
        this.isSubmitDisabled = false;
    }

    addPrediction() {
        const predictions = this.predictions.getValue();
        predictions.push({
            team: this.predictionTeam,
            position: this.predictionPosition,
        });
        this.predictions.next(predictions);
        this.predictionPosition = undefined;
        this.predictionTeam = undefined;
        this.updateSubmit();
    }

    removePrediction(event: Event, index: number) {
        event.stopPropagation();
        const current = this.predictions.getValue();
        current.splice(index, 1);
        this.predictions.next(current);
        this.updateSubmit();
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
