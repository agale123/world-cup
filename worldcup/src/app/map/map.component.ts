import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { API_KEY } from '../key';
import { MapLoaderService } from '../map-loader.service';

declare var google: any;

const STATS = [
    ['Country', 'Appearances', 'Wins'],
    ['Canada', 7, 0],
    ['China', 7, 0],
    ['New Zealand', 5, 0],
    ['Germany', 8, 2],
    ['Norway', 8, 1],
    ['Thailand', 2, 0],
    ['Japan', 8, 1],
    ['United States', 8, 3],
    ['Australia', 7, 0],
    ['Sweden', 8, 0],
    ['Brazil', 8, 0],
    ['South Korea', 3, 0],
    ['Spain', 2, 0],
    ['France', 4, 0],
    ['England', 5, 0],
    ['Jamaica', 1, 0],
    ['Chile', 1, 0],
    ['Italy', 3, 0],
    ['Scotland', 1, 0],
    // TODO: Add last 5 teams.
];

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent {

    @ViewChild('map') mapElement: ElementRef;

    constructor(private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute, mapLoader: MapLoaderService) {
        mapLoader.isLoaded.subscribe(() => {
            google.charts.load('current', {
                packages: ['geochart'],
                mapsApiKey: API_KEY,
            });
            google.charts.setOnLoadCallback(() => this.drawMap());
        });
    }

    private drawMap() {
        const data = google.visualization.arrayToDataTable(STATS);

        const options = {
            legend: 'none',
            width: '714px',
            colorAxis: { colors: ['#9FA8DA', '#3f51b5'] },
            enableRegionInteractivity: true,
        };

        const chart =
            new google.visualization.GeoChart(this.mapElement.nativeElement);

        chart.draw(data, options);

        google.visualization.events.addListener(chart, 'select', () => {
            const selection = chart.getSelection()[0].row;
            const country = STATS[selection + 1][0];
            this.router.navigate(['schedule'], {
                queryParams: {
                    ...this.activatedRoute.snapshot.queryParams,
                    t: country,
                }
            });
        });
    }
}
