import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

    @Output()
    deleteChip = new EventEmitter<void>();

    showChip: Observable<boolean>;

    text: Observable<string>;

    ngOnInit() {
        this.text = this.valueChanges.pipe(map(values => {
            return `${this.label}: ${values.join(', ')}`;
        }));

        this.showChip = this.valueChanges.pipe(
            map(values => {
                return values && values.length > 0;
            }));
    }
}
