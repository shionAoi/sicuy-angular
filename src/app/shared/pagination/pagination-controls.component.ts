import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {PaginationModel} from './models/pagination.model';

@Component({
    selector: 'app-pagination-controls',
    templateUrl: './pagination-controls.component.html',
    styleUrls: ['./pagination-controls.component.css']
})
export class PaginationControlsComponent implements OnInit {

    _itemsSize = 0
    _pages: number[] = []
    _currentPage = 0
    @Input() pageSize = 12
    @Input() maxPages = 3
    @Output() changePage = new EventEmitter<PaginationModel>()
    @Output() changePage1 = new EventEmitter<number>()

    @Input() set itemsSize(value: number) {
        this._itemsSize = value
        const numberOfPages = this.calculatePages()
        this._pages = Array(numberOfPages)
        // if (this._currentPage >= numberOfPages) {
        //     this._currentPage = 0
        // }
        console.log('current', this._currentPage)
        console.log('items size', this._itemsSize)
    }

    constructor() {
    }

    ngOnInit(): void {
    }

    setPage(page: number) {
        this._currentPage = page
        this.changePage.emit({ skip: this._currentPage * this.pageSize, limit: 12 })
        this.changePage1.emit(page + 1)
    }

    private calculatePages(): number {
        return Math.ceil(this._itemsSize / this.pageSize)
    }
}

