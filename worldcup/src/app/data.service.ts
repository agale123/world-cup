import { Injectable } from '@angular/core';
import { GAMES, GROUPS, GroupTeam, Team } from './data';

@Injectable({ providedIn: 'root' })
export class DataService {
    readonly games = [];

    constructor() {
        GAMES.forEach(game => {
            this.games.push({
                id: game.id,
                home: game.home,
                away: game.away,
                date: game.date.toLocaleString('en-US'),
                city: game.city,
            });
        });
    }

    formatTeam(team: Team) {
        if ('index' in team) {
            return GROUPS[team.group][team.index - 1];
        } else if ('seed' in team) {
            return `${team.seed}${team.group.join('')}`;
        } else if ('teams' in team) {
            return team.teams.join('|');
        } else if ('winner' in team) {
            return `W${team.winner}`;
        } else if ('loser' in team) {
            return `L${team.loser}`;
        } else {
            return '';
        }
    }

    getTeamObject(team: string) {
        const group = this.getGroup(team);
        return {
            group,
            index: GROUPS[group].indexOf(team) + 1
        };
    }

    getGroup(team: string) {
        for (const group of Object.keys(GROUPS)) {
            if (GROUPS[group].indexOf(team) >= 0) {
                return group;
            }
        }
        throw new Error('Team not found');
    }
}
