import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { STATS } from '../data';

declare var google: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    @ViewChild('map') mapElement: ElementRef;

    constructor(private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        google.charts.load('current', {
            packages: ['geochart'],
        });
        google.charts.setOnLoadCallback(() => this.drawMap());
    }

    private drawMap() {
        const dataArray = [['Country', 'Appearances', 'Wins']];
        Object.keys(STATS).forEach((team: string) => {
            dataArray.push([team, STATS[team].appearances, STATS[team].wins]);
        });
        const data = google.visualization.arrayToDataTable(dataArray);

        const options = {
            legend: 'none',
            width: '814px',
            colorAxis: { colors: ['#9FA8DA', '#3f51b5'] },
            enableRegionInteractivity: true,
        };

        const chart =
            new google.visualization.GeoChart(this.mapElement.nativeElement);

        chart.draw(data, options);

        google.visualization.events.addListener(chart, 'select', () => {
            const selection = chart.getSelection()[0].row;
            const country = dataArray[selection + 1][0];
            this.router.navigate(['schedule'], {
                queryParams: {
                    ...this.activatedRoute.snapshot.queryParams,
                    t: country,
                }
            });
        });
    }
}
