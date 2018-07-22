import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-filter-chip',
    templateUrl: './filter-chip.component.html',
    styleUrls: ['./filter-chip.component.css']
})
export class FilterChipComponent implements OnInit {

    @Input()
    valueChanges: Observable<string[]>;

    @Input()
    label: string;

    showChip: Observable<boolean>;

    ngOnInit() {
        this.showChip = this.valueChanges.pipe(
            map(values => {
                console.log(values);
                return values && values.length > 0;
            }));
    }

}
