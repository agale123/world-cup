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

    formatDate(dateString: Date): string {
        const date = new Date(dateString);
        const month = date.getMonth() === 6 ? 'June' : 'July';
        const day = date.getDate().toString();
        const hour = (date.getHours() % 12).toString();
        const minutes = date.getMinutes() === 0 ? '00' : '30';
        const post = date.getHours() > 12 ? 'PM' : 'AM';
        return `${month} ${day}, ${hour}:${minutes} ${post}`;
    }

}
