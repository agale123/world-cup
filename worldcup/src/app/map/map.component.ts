import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {TEAMS} from '../data';

declare var google: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    @ViewChild('map') mapElement: ElementRef;

    constructor() { }

    ngOnInit() {
        // TODO: add mapsApiKey
        google.charts.load('current', { packages: ['geochart'] });
        google.charts.setOnLoadCallback(() => this.drawMap());
    }

    private drawMap() {
        const dataArray = [['Country', 'Appearances']];
        TEAMS.forEach(team => {
            dataArray.push([team, 1]);
        });
        const data = google.visualization.arrayToDataTable(dataArray);

        const options = {
            legend: 'none',
            width: '800px',
        };

        const chart =
            new google.visualization.GeoChart(this.mapElement.nativeElement);

        chart.draw(data, options);
    }
}
