import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DistancesResolver implements Resolve<Observable<Map<string, number>>> {

    constructor(private readonly http: HttpClient) { }

    resolve() {
        return this.http.get('assets/distances.json').pipe(
            map(response =>
                new Map(response['data']) as Map<string, number>
            ));
    }
}
