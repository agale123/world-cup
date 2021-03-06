import { filter, map } from 'rxjs/operators';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CITIES, TEAMS } from '../data';
import { DataService } from '../data.service';
import { AnalyticsService } from '../analytics.service';
import { API_KEY } from '../key';
import { MapLoaderService } from '../map-loader.service';

declare let google: any;

export interface Preference {
    team?: string;
    weight?: number;
}

export interface Node {
    value: number;
    path: (string | null)[];
}

const DEFAULT_WEIGHT = 0.5;
const GAME_MULTIPLIER = 20;
const DISTANCE_POWER = 0.5;

const INITIAL = [
    { path: [null], value: 0 },
];

const START_DATE = new Date('June 7, 2019');
const END_DATE = new Date('June 20, 2019');

@Component({
    selector: 'app-itinerary',
    templateUrl: './itinerary.component.html',
    styleUrls: ['./itinerary.component.css']
})
export class ItineraryComponent implements OnInit {

    @ViewChild('map') mapElement: ElementRef;

    preferences: Preference[] = [{}];

    readonly teamList: string[] = TEAMS;

    // Final list of games.
    games = [];

    // Summary stats.
    teams = [];
    cities = [];
    distanceTravelled = 0;

    private chartsLoaded = new BehaviorSubject(false);
    private componentsLoaded = new Subject<boolean>();

    private readonly distancesMap;
    private readonly schedule;
    private readonly gamesPerDay;

    constructor(private readonly dataService: DataService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly analyticsService: AnalyticsService,
        private readonly changeDetector: ChangeDetectorRef,
        mapLoader: MapLoaderService) {
        // Read in data from route.
        this.distancesMap = this.activatedRoute.snapshot.data.distances;
        this.schedule = this.activatedRoute.snapshot.data.schedule;
        this.gamesPerDay = dataService.getGamesPerDayMap(this.schedule);

        // Read initial state from route.
        const initialState = this.activatedRoute.snapshot.queryParams;
        if (initialState.w) {
            this.preferences = initialState.w.split(',').map(p => {
                return {
                    weight: parseInt(p.slice(0, 1), 10),
                    team: p.slice(1),
                };
            }).filter(pref => {
                return pref.weight >= 1 && pref.weight <= 5
                    && TEAMS.includes(pref.team);
            });
        }

        if (this.preferences.length === 0) {
            this.preferences = [{}];
        }

        // Compute itinerary once everything is loaded.
        combineLatest(
            this.componentsLoaded,
            this.chartsLoaded).pipe(
                filter(([componentsLoaded, chartsLoaded]) => !!componentsLoaded && !!chartsLoaded))
            .subscribe(() => {
                if (this.preferences.length > 0 && !!this.preferences[0].team) {
                    this.computeItinerary();
                }
            });

        // Start map loading.
        mapLoader.isLoaded.subscribe(() => {
            google.charts.load('current', {
                packages: ['geochart'],
                mapsApiKey: API_KEY,
            });
            google.charts.setOnLoadCallback(() => {
                this.chartsLoaded.next(true);
                if (this.games.length > 0) {
                    this.drawMap();
                }
            });
        });
    }

    ngOnInit() {
        this.analyticsService.logPageView();
        this.componentsLoaded.next(true);
    }

    addTeam() {
        this.preferences.push({});
    }

    deleteTeam(index: number) {
        this.preferences.splice(index, 1);
    }

    private updateQueryParams() {
        const formatted =
            this.preferences.map(p => `${p.weight}${p.team}`);
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                ...this.activatedRoute.snapshot.queryParams,
                w: formatted.length === 0 ? undefined :
                    formatted.toString(),
            },
        });
    }

    computeItinerary() {
        this.preferences.forEach(preference => {
            this.analyticsService.logEvent({
                'metric1': `${preference.weight}`,
                'dimension1': preference.team,
            });
        });

        this.updateQueryParams();
        let prev = INITIAL;
        let next = [];
        const date = new Date(START_DATE);
        while (date <= new Date(END_DATE)) {
            for (const city of [null, ...CITIES]) {
                let value = Number.NEGATIVE_INFINITY;
                let path = [];
                for (const node of prev) {
                    const cost =
                        this.cost(node.path[node.path.length - 1], city);
                    const newValue = node.value + cost;
                    if (newValue > value && !(!city && !!node.value)) {
                        value = newValue;
                        path = [...node.path];
                    }
                }
                value += this.reward(date, city);
                path.push(city);
                next.push({ path, value });
            }
            prev = next;
            next = [];
            date.setDate(date.getDate() + 1);
        }

        prev.sort((a, b) => {
            if (a.value === b.value) {
                return 0;
            } else if (a.value > b.value) {
                return -1;
            }
            return 1;
        });
        const bestPath = prev[0].path;
        // Remove the empty value from day 0.
        bestPath.shift();
        this.games = this.schedule.filter(game => {
            const gameDate = new Date(`${game.date.split(',')[0]}, 2019`);
            const indexedDate = gameDate.getDate() - START_DATE.getDate();
            return indexedDate < bestPath.length
                && bestPath[indexedDate] === game.city;
        });
        this.changeDetector.detectChanges();

        this.computeSummary(bestPath);
    }

    isSubmitDisabled() {
        if (!this.distancesMap) {
            return true;
        }
        const teams = new Set<string>();
        for (const pref of this.preferences) {
            if (!pref.team || !pref.weight || pref.weight < 1
                || pref.weight > 5) {
                return true;
            } else if (teams.has(pref.team)) {
                return true;
            }
            teams.add(pref.team);
        }
        return false;
    }

    private drawMap() {
        const dataArray = [['City', 'Games']];
        this.cities.forEach(city => {
            const count =
                this.games.reduce((n, val) => n + (val.city === city), 0);
            dataArray.push([city, count]);
        });
        const data = google.visualization.arrayToDataTable(dataArray);

        const options = {
            region: 'FR',
            legend: 'none',
            displayMode: 'markers',
            colorAxis: { colors: ['#3f51b5', '#3f51b5'] },
            height: '160px',
            resolution: 'provinces',
            magnifyingGlass: { enable: 'false' },
            sizeAxis: { minValue: 1, maxValue: 8 },
        };

        const chart =
            new google.visualization.GeoChart(this.mapElement.nativeElement);

        chart.draw(data, options);
    }

    private computeSummary(path: (string | null)[]) {
        // Compute total distance.
        this.distanceTravelled = 0;
        const dedupedPath = path.filter((item, index, array) => {
            return !!item && (index === 0 || item !== array[index - 1]);
        });
        for (let i = 1; i < dedupedPath.length; i++) {
            this.distanceTravelled +=
                this.distance(dedupedPath[i - 1], dedupedPath[i]);
        }

        // Compute list of cities.
        this.cities = Array.from(new Set(path.filter(city => !!city))).sort();

        // Compute list of teams.
        const teams = [];
        this.games.forEach(game => {
            teams.push(this.dataService.formatTeam(game.home));
            teams.push(this.dataService.formatTeam(game.away));
        });
        const dedupedTeams = Array.from(new Set(teams)).map(t => {
            return {
                team: t,
                count: teams.reduce((n, val) => n + (val === t), 0)
            };
        });
        this.teams = dedupedTeams.sort((a, b) => {
            if (a.count > b.count) {
                return -1;
            } else if (a.count < b.count) {
                return 1;
            }
            return 0;
        }).map(val => `${val.team} (${val.count})`);

        if (this.chartsLoaded.getValue()) {
            this.drawMap();
        }
    }

    private reward(date: Date, city: string | null) {
        if (city === null) {
            // Haven't started attending games yet.
            return 0;
        }

        const month = date.getMonth() === 5 ? 'June' : 'July';
        const dateKey = `${month} ${date.getDate()}`;
        const games = this.gamesPerDay.get(`${dateKey}${city}`);
        if (!games) {
            return 0;
        }

        let value = 0;
        games.forEach(team => {
            let weight = DEFAULT_WEIGHT;
            this.preferences.forEach(pref => {
                if (pref.team === team) {
                    weight = pref.weight;
                }
            });
            value += weight * GAME_MULTIPLIER / this.preferences.length;
        });

        return value;
    }

    private cost(a: string | null, b: string | null) {
        return -1 * Math.pow(this.distance(a, b), DISTANCE_POWER);
    }

    private distance(a: string | null, b: string | null) {
        if (a === b) {
            // Both cities are the same.
            return 0;
        } else if (a === null || b === null) {
            // Null represents any city, so distance is 0.
            return 0;
        }
        return this.distancesMap.get([a, b].sort().join());
    }
}
