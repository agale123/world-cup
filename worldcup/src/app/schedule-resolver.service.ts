import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScheduleResolver implements Resolve<Observable<Object>> {

    constructor(private readonly http: HttpClient) { }

    resolve() {
        return this.http.get('assets/schedule.json').pipe(
            map(response => response['data']),
            map(games => {
                return games.map(game => {
                    return {
                        id: game.id,
                        home: game.home,
                        away: game.away,
                        date: new Date(game.date).toLocaleString('en-US'),
                        city: game.city,
                    };
                });
            })
        );
    }
}
