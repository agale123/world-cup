import { Component } from '@angular/core';

import { TEAMS } from '../data';

export interface Preference {
    team?: string;
    weight?: number;
}

@Component({
    selector: 'app-itinerary',
    templateUrl: './itinerary.component.html',
    styleUrls: ['./itinerary.component.css']
})
export class ItineraryComponent {

    preferences: Preference[] = [{} as Preference];

    readonly teamList: string[] = TEAMS;

    games = [];

    constructor() { }

    addTeam() {
        this.preferences.push({});
    }

    deleteTeam(index: number) {
        this.preferences.splice(index, 1);
    }

    computeItinerary() {
        console.log('calculating');
        console.log(this.preferences);
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
}
