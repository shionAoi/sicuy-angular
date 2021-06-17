import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Pool} from '../../../../api/graphql';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PoolsService} from '../services/pools.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-pool-status-modal',
    templateUrl: './pool-status-modal.component.html',
    styleUrls: ['./pool-status-modal.component.css']
})
export class PoolStatusModalComponent implements OnInit, OnDestroy {

    error = null
    loading = false
    active = false

    @Input() pool: Pool = null

    subject = new Subject<void>()

    constructor(private modal: NgbActiveModal,
                private poolsService: PoolsService) {
    }

    ngOnInit(): void {
        this.active = this.pool.active
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
        if (this.pool.active === this.active) {
            this.close()
            return
        }
        this.poolsService.updatePoolStatus(this.pool._id, this.active)
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
