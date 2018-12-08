import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, ResolveEnd, NavigationEnd } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    readonly activeLink: Observable<string>;
    readonly routeLinks = [
        { label: 'Home', link: '/home' },
        { label: 'Schedule Explorer', link: '/schedule' },
        { label: 'Itinerary Planner', link: '/itinerary' },
    ];

    constructor(router: Router) {
        this.activeLink = router.events
            .pipe(
                filter(event => event instanceof ResolveEnd || event instanceof NavigationEnd),
                map((event: ResolveEnd) => event.urlAfterRedirects),
            );
    }
}
