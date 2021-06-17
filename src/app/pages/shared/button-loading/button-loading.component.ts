import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-button-loading',
    templateUrl: './button-loading.component.html',
    styleUrls: ['./button-loading.component.css']
})
export class ButtonLoadingComponent implements OnInit {

    @Input() loading = false
    @Input() disabled = false
    @Input() textOnLoading = 'default...'
    @Input() textOnNormal = 'default'
    @Input() containerClass = 'btn btn-primary'
    @Output() buttonClick = new EventEmitter<void>()

    constructor() {
    }

    ngOnInit(): void {
    }

}
