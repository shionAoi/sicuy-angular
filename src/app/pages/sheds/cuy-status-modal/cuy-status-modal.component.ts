import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Cuy, Pool} from '../../../../api/graphql';
import {Subject} from 'rxjs';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PoolsService} from '../services/pools.service';
import {takeUntil} from 'rxjs/operators';
import {CuysService} from '../services/cuys.service';

@Component({
    selector: 'app-cuy-status-modal',
    templateUrl: './cuy-status-modal.component.html',
    styleUrls: ['./cuy-status-modal.component.css']
})
export class CuyStatusModalComponent implements OnInit, OnDestroy {

    error = null
    loading = false
    active = false

    @Input() cuy: Cuy = null

    subject = new Subject<void>()

    constructor(private modal: NgbActiveModal,
                private cuysService: CuysService) {
    }

    ngOnInit(): void {
        this.active = this.cuy.active
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
        if (this.cuy.active === this.active) {
            this.close()
            return
        }
        this.cuysService.updateCuyStatus(this.cuy._id, this.active)
            .pipe(takeUntil(this.subject))
            .subscribe(
                (res) => {
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
