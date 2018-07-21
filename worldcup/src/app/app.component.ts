import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

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
        { label: 'Schedule', link: '/schedule' },
        { label: 'Itinerary', link: '/itinerary' },
    ];

    useTabNavigation = false;

    constructor(private router: Router) {
        this.activeLink = router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map((event: NavigationEnd) => event.urlAfterRedirects),
            );
    }
}
