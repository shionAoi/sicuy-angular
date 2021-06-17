import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-card-category-value',
    templateUrl: './card-category-value.component.html',
    styleUrls: ['./card-category-value.component.css']
})
export class CardCategoryValueComponent implements OnInit {


    @Input() category: CategoryValuesModel = {
        leftTitle: 'untitled',
        leftValue: 0,
        rightTitle: 'untitled',
        rightValue: 0,
        icon: 'nc-box',
        name: 'untitled',
        iconColor: 'text-success'
    }

    constructor() {
    }

    ngOnInit(): void {
    }

}
