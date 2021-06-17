import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Shed} from '../../../../api/graphql';
import {ShedsService} from '../services/sheds.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-shed-status-modal',
    templateUrl: './shed-status-modal.component.html',
    styleUrls: ['./shed-status-modal.component.css']
})
export class ShedStatusModalComponent implements OnInit, OnDestroy {

    @Input() shed: Shed = null
    active = true

    loading = false
    error = null

    subject = new Subject<void>()

    constructor(private modal: NgbActiveModal,
                private shedsService: ShedsService) {
    }

    ngOnInit(): void {
        this.active = this.shed.active
    }

    dismiss(reason?: string) {
        this.modal.dismiss(reason)
    }

    close(result?: string) {
        this.modal.close(result)
    }

    change() {
        this.active = !this.active
    }

    saveStatus() {
        this.loading = true
        this.error = null
        if (this.shed && this.shed.active === this.active) {
            this.close()
            return
        }
        this.shedsService.updateShedStatus(this.shed._id, this.active)
            .pipe(takeUntil(this.subject))
            .subscribe(
                () => {
                    this.loading = false
                    this.close()
                },
                (err) => {
                    this.loading = false
                    this.error = 'error'
                    console.log(err)
                }
            )
    }

    ngOnDestroy(): void {
        this.subject.next()
        this.subject.complete()
    }
}
