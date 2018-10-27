import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { filter, first, shareReplay, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MapLoaderService {
    readonly isLoaded: Observable<void>;

    constructor(router: Router) {
        this.isLoaded = router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            first(),
            switchMap(() => {
                const scriptElement = document.createElement('script');
                scriptElement.src = 'https://www.gstatic.com/charts/loader.js';
                const loadedEvent = new Subject<void>();
                scriptElement.onload = () => {
                    loadedEvent.next();
                };
                document.body.appendChild(scriptElement);
                return loadedEvent;
            }),
            shareReplay(1),
        );

    }
}
