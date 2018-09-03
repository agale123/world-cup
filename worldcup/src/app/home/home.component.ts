import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private readonly analyticsService: AnalyticsService) { }

    ngOnInit() {
        this.analyticsService.logPageView();
    }

}
