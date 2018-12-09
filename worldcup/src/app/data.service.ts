import { Injectable } from '@angular/core';
import { GROUPS, Team } from './data';

@Injectable({ providedIn: 'root' })
export class DataService {
    constructor() {
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

    getGamesPerDayMap(schedule) {
        const gamesPerDay = new Map<string, string[]>();
        schedule.forEach(game => {
            const date = game.date.split(',')[0];
            const key = `${date}${game.city}`;
            if (!gamesPerDay.has(key)) {
                gamesPerDay.set(key, []);
            }
            const current = gamesPerDay.get(key);
            current.push(this.formatTeam(game.home));
            current.push(this.formatTeam(game.away));
        });
        return gamesPerDay;
    }
}
