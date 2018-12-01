import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StatsResolver implements Resolve<Observable<Object>> {

    constructor(private readonly http: HttpClient) { }

    resolve() {
        return this.http.get('assets/stats.json').pipe(
            map((response) => response['data']),
            map(data => {
                return data.map(row => {
                    if (row[0] === 'England') {
                        return [
                            {v: row[0], f: 'England/Scotland'},
                            {v: row[1], f: '5/1'},
                            {v: row[2], f: '0/0'},
                        ];
                    }
                    return [{v: row[0]}, row[1], row[2]];
                });
            }));
    }
}
