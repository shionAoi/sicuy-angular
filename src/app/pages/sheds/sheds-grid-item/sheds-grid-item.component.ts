import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Shed} from '../../../../api/graphql';

@Component({
    selector: 'app-sheds-grid-item',
    templateUrl: './sheds-grid-item.component.html',
    styleUrls: ['./sheds-grid-item.component.css']
})
export class ShedsGridItemComponent implements OnInit {

    @Input() shed: Shed = null

    @Output() editEmitter = new EventEmitter<Shed>()
    @Output() removeEmitter = new EventEmitter<Shed>()
    @Output() changeStatusEmitter = new EventEmitter<Shed>()
    @Output() goToPoolsEmitter = new EventEmitter<Shed>()

    constructor() {
    }

    ngOnInit(): void {
    }

    editShed() {
        this.editEmitter.emit(this.shed)
    }

    removeShed() {
        this.removeEmitter.emit(this.shed)
    }

    changeShedStatus() {
        this.changeStatusEmitter.emit(this.shed)
    }

    goToPools() {
        this.goToPoolsEmitter.emit(this.shed)
    }
}
