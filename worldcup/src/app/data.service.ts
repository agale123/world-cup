import { shareReplay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GAMES, GROUPS, Team } from './data';

@Injectable({ providedIn: 'root' })
export class DataService {
    readonly games = [];

    readonly gamesPerDay = new Map<string, string[]>();

    private readonly distances;

    constructor(http: HttpClient) {
        this.distances = http.get('assets/distances.json').pipe(
            map(response =>
                new Map(response['data']) as Map<string, number>
            ),
            shareReplay(1),
        );

        GAMES.forEach(game => {
            this.games.push({
                id: game.id,
                home: game.home,
                away: game.away,
                date: game.date.toLocaleString('en-US'),
                city: game.city,
            });

            const key = `${game.date.toDateString()}${game.city}`;
            if (!this.gamesPerDay.has(key)) {
                this.gamesPerDay.set(key, []);
            }
            const current = this.gamesPerDay.get(key);
            current.push(this.formatTeam(game.home));
            current.push(this.formatTeam(game.away));
        });
    }

    getDistances() {
        return this.distances;
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

    getGames(date: Date, city: string) {
        const key = `${date.toDateString()}${city}`;
        return this.gamesPerDay.get(key);
    }
}
