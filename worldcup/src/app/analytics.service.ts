import { Injectable } from '@angular/core';

declare let ga: Function;

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
    private readonly isDev:  boolean;

    constructor() {
        this.isDev = location.href.indexOf('localhost') >= 0;
    }
    logPageView() {
        if (this.isDev) {
            console.log(`PageView: ${location.pathname}${location.search}`);
        } else {
            ga('send', 'pageview', `${location.pathname}${location.search}`);
        }
    }

    logEvent(event: {[key: string]: string}) {
        if (this.isDev) {
            console.log('Event:');
            console.log(event);
        } else {
            ga('set', event);
        }
    }
}
