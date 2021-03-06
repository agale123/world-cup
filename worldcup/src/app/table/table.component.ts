import { Component, Input } from '@angular/core';
import { Team } from '../data';
import { DataService } from '../data.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent {

    readonly displayedColumns = ['id', 'home', 'away', 'city', 'date'];

    @Input()
    games;

    constructor(private readonly dataService: DataService) { }

    splitTeam(team: Team) {
        return this.dataService.formatTeam(team).split('|');
    }
}
