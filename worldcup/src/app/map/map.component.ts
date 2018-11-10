import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, switchMap } from 'rxjs/operators';

import { API_KEY } from '../key';
import { MapLoaderService } from '../map-loader.service';
import { HttpClient } from '@angular/common/http';

declare var google: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent {

    @ViewChild('map') mapElement: ElementRef;

    constructor(private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        mapLoader: MapLoaderService, http: HttpClient) {
        // TODO: Add last 5 teams
        mapLoader.isLoaded.pipe(
            switchMap(() => http.get('assets/stats.json')),
            map((response) => response['data']),
            first()).subscribe(data => {
                google.charts.load('current', {
                    packages: ['geochart'],
                    mapsApiKey: API_KEY,
                });
                google.charts.setOnLoadCallback(() => this.drawMap(data));
            });
    }

    private drawMap(data) {
        const table = google.visualization.arrayToDataTable([
            ['Country', 'Appearances', 'Wins'],
            ...data
        ]);

        const options = {
            legend: 'none',
            width: '714px',
            colorAxis: { colors: ['#9FA8DA', '#3f51b5'] },
            enableRegionInteractivity: true,
        };

        const chart =
            new google.visualization.GeoChart(this.mapElement.nativeElement);

        chart.draw(table, options);

        google.visualization.events.addListener(chart, 'select', () => {
            const selection = chart.getSelection()[0].row;
            const country = data[selection][0];
            this.router.navigate(['schedule'], {
                queryParams: {
                    ...this.activatedRoute.snapshot.queryParams,
                    t: country,
                }
            });
        });
    }
}
