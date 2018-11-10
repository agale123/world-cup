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
            map((response) => response['data']));
    }
}
