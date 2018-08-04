import { Component } from '@angular/core';

import { CITIES, DISTANCES, Team, TEAMS } from '../data';
import { DataService } from '../data.service';
import { indexDebugNode } from '../../../node_modules/@angular/core/src/debug/debug_node';

export interface Preference {
    team?: string;
    weight?: number;
}

export interface Node {
    value: number;
    path: (string | null)[];
}

const DEFAULT_WEIGHT = 0.75;
const GAME_MULTIPLIER = 100;
const GAME_POWER = 1.25;

const INITIAL = [
    { path: [null], value: 0 },
];

const START_DATE = new Date(2019, 6, 7);
const END_DATE = new Date(2019, 6, 20);

@Component({
    selector: 'app-itinerary',
    templateUrl: './itinerary.component.html',
    styleUrls: ['./itinerary.component.css']
})
export class ItineraryComponent {

    preferences: Preference[] = [{}];

    readonly teamList: string[] = TEAMS;

    games = [];

    constructor(private readonly dataService: DataService) {
    }

    addTeam() {
        this.preferences.push({});
    }

    deleteTeam(index: number) {
        this.preferences.splice(index, 1);
    }

    computeItinerary() {
        let prev = INITIAL;
        let next = [];
        const date = new Date(START_DATE);
        while (date <= new Date(END_DATE)) {
            for (const city of [null, ...CITIES]) {
                let value = Number.NEGATIVE_INFINITY;
                let path = [];
                for (const node of prev) {
                    const dist =
                        this.distance(node.path[node.path.length - 1], city);
                    const newValue = node.value - dist;
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
        this.games = this.dataService.games.filter(game => {
            const gameDate = new Date(game.date);
            if (gameDate > END_DATE) {
                return false;
            }
            const indexedDate = gameDate.getDate() - START_DATE.getDate();
            return bestPath[indexedDate] === game.city;
        });
    }

    isSubmitDisabled() {
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

    private reward(date: Date, city: string | null) {
        if (city === null) {
            // Haven't started attending games yet.
            return 0;
        }

        const games = this.dataService.getGames(date, city);
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
            value += Math.pow(weight, GAME_POWER) * GAME_MULTIPLIER;
        });

        return value;
    }

    private distance(a: string | null, b: string | null) {
        if (a === b) {
            // Both cities are the same.
            return 0;
        } else if (a === null || b === null) {
            // Null represents any city, so distance is 0.
            return 0;
        }
        return DISTANCES.get([a, b].sort().join());
    }
}
