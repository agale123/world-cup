import { Injectable } from '@angular/core';
import {GAMES, GROUPS, GroupTeam, Team} from './data';

@Injectable({providedIn: 'root'})
export class DataService {
    readonly games = [];

    constructor() {
        GAMES.forEach(game => {
            this.games.push({
                home: this.lookupTeam(game.home),
                away: this.lookupTeam(game.away),
                date: game.date.toLocaleString('en-US'),
                city: game.city,
            });
        });
    }

    lookupTeam(team: Team) {
        if ('index' in team) {
        return GROUPS[team.group][team.index - 1];
        } else {
            return '';
        }
    }
}
