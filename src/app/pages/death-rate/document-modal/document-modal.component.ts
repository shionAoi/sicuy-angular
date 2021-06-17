import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-document-modal',
    templateUrl: './document-modal.component.html',
    styleUrls: ['./document-modal.component.css']
})
export class DocumentModalComponent implements OnInit {

    loading = false
    error: string = null

    @Input() document: string = null

    constructor(
        private modal: NgbActiveModal
    ) {
    }

    ngOnInit(): void {
    }

    close() {
        this.modal.close()
    }

    dismiss() {
        this.modal.dismiss()
    }

}
