import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CITIES, GROUPS, TEAMS, Team } from '../data';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { AnalyticsService } from '../analytics.service';

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
export class ScheduleComponent implements OnInit {
    readonly games;

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

    constructor(private readonly dataService: DataService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly analyticsService: AnalyticsService) {
        this.initializeState();

        const gamesWithPredictions = this.predictions.pipe(
            map(predictions => {
               // Deep copy of array.
                const games =
                    JSON.parse(JSON.stringify(this.activatedRoute.snapshot.data.schedule));
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

        this.teamChanges.subscribe(teams => {
            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: {
                    ...this.activatedRoute.snapshot.queryParams,
                    t: teams.length === 0 ? undefined : teams.toString(),
                },
            });
        });

        this.cityChanges.subscribe(cities => {
            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: {
                    ...this.activatedRoute.snapshot.queryParams,
                    c: cities.length === 0 ? undefined : cities.toString(),
                },
            });
        });

        this.predictions.subscribe(predictions => {
            const formatted =
                predictions.map(p => `${p.position}${p.team}`);
            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: {
                    ...this.activatedRoute.snapshot.queryParams,
                    p: formatted.length === 0 ? undefined :
                        formatted.toString(),
                },
            });
        });
    }

    ngOnInit() {
        this.analyticsService.logPageView();
    }

    filterTeam(team: string) {
        if (this.teams.value.indexOf(team) === -1) {
            return;
        }
        this.analyticsService.logEvent({
            'dimension3': team,
        });
    }

    filterCity(city: string) {
        if (this.cities.value.indexOf(city) === -1) {
            return;
        }
        this.analyticsService.logEvent({
            'dimension4': city,
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
        this.analyticsService.logEvent({
            'metric2': `${this.predictionPosition}`,
            'dimension2': this.predictionTeam,
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

    private hasIntersection(a: string[], b: string[]) {
        for (const el of a) {
            if (b.indexOf(el) >= 0) {
                return true;
            }
        }
        return false;
    }

    private initializeState() {
        const initialState = this.activatedRoute.snapshot.queryParams;
        setTimeout(() => {
            if (initialState.t) {
                const teams = initialState.t.split(',')
                    .filter(team => TEAMS.includes(team));

                this.teams.setValue(teams);
            }
            if (initialState.c) {
                const cities = initialState.c.split(',')
                    .filter(city => CITIES.includes(city));
                this.cities.setValue(cities);
            }
            if (initialState.p) {
                this.predictions.next(initialState.p.split(',').map(p => {
                    return {
                        position: parseInt(p.slice(0, 1), 10),
                        team: p.slice(1)
                    };
                }).filter(pred => {
                    return TEAMS.includes(pred.team)
                        && (pred.position === 1 || pred.position === 2);
                }));
            }
        });
    }
}
