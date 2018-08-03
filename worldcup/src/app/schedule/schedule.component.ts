import { Component } from '@angular/core';
import { CITIES, GROUPS, TEAMS, Team } from '../data';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

export interface Prediction {
    team: string;
    position: number;
    group: string;
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

    private checkFirstEliminationGame(team: Team, predictions: Prediction[]) {
        if ('seed' in team && team.group.length === 1) {
            for (const prediction of predictions) {
                if (`${team.seed}` === `${prediction.position}`
                    && team.group[0] === prediction.group) {
                    return this.dataService.getTeamObject(prediction.team);
                }
            }
        }
        return undefined;
    }

    private checkEliminationGame(team: Team,
        elimWinners: { [key: number]: string[] }) {
        if ('winner' in team && !!elimWinners[team.winner]) {
            team.teams = elimWinners[team.winner];
            return team;
        }
        return undefined;
    }

    private addWinner(id: number, team: Team,
        elimWinners: { [key: number]: string[] }) {
        if (!elimWinners[id]) {
            elimWinners[id] = [];
        }
        const current = elimWinners[id];
        if ('teams' in team) {
            elimWinners[id] = [...current, ...team.teams];
        } else {
            const name = this.dataService.formatTeam(team);
            elimWinners[id] = [...current, name];
        }
    }

    constructor(private readonly dataService: DataService) {
        const gamesWithPredictions = this.predictions.pipe(
            map(predictions => {
                // Deep copy of array.
                const games =
                    JSON.parse(JSON.stringify(this.dataService.games));
                const elimWinners: { [key: number]: string[] } = {};
                for (const game of games) {
                    const first =
                        this.checkFirstEliminationGame(game.home, predictions);
                    if (first) {
                        game.home = first;
                        this.addWinner(game.id, game.home, elimWinners);
                    } else {
                        const rest =
                            this.checkEliminationGame(game.home, elimWinners);
                        if (rest) {
                            game.home = rest;
                            this.addWinner(game.id, game.home, elimWinners);
                        }
                    }
                    const updatedAway =
                        this.checkFirstEliminationGame(game.away, predictions);
                    if (updatedAway) {
                        game.away = updatedAway;
                        this.addWinner(game.id, game.away, elimWinners);
                    } else {
                        const rest =
                            this.checkEliminationGame(game.away, elimWinners);
                        if (rest) {
                            game.away = rest;
                            this.addWinner(game.id, game.away, elimWinners);
                        }
                    }

                }
                return games;
            }),
        );

        this.games = combineLatest(
            this.teamChanges, this.cityChanges, gamesWithPredictions,
            (teamChanges, cityChanges, games) => {
                return games.filter(game => {
                    const home =
                        this.dataService.formatTeam(game.home).split('|');
                    const away =
                        this.dataService.formatTeam(game.away).split('|');
                    const isCityMatch = cityChanges.length === 0
                        || cityChanges.indexOf(game.city) >= 0;
                    const isTeamMatch = teamChanges.length === 0
                        || this.hasIntersection(teamChanges, home)
                        || this.hasIntersection(teamChanges, away);
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
            group: this.dataService.getGroup(this.predictionTeam),
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

    private hasIntersection(a: string[], b: string[]) {
        for (const el of a) {
            if (b.indexOf(el) >= 0) {
                return true;
            }
        }
        return false;
    }
}
