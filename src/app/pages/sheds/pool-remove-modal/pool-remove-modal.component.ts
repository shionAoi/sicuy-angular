import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ShedsService} from '../services/sheds.service';
import {Pool} from '../../../../api/graphql';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PoolsService} from '../services/pools.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-pool-remove-modal',
    templateUrl: './pool-remove-modal.component.html',
    styleUrls: ['./pool-remove-modal.component.css']
})
export class PoolRemoveModalComponent implements OnInit, OnDestroy {

    removePoolF = new FormGroup({
        code: new FormControl('', [Validators.required])
    })

    loading = false
    code: string

    @Input() pool: Pool = null

    subject = new Subject<void>()

    constructor(private modal: NgbActiveModal,
                private poolsService: PoolsService) {
    }

    ngOnInit(): void {
    }

    onKey(event) {
        this.code = event.target.value
    }

    dismiss() {
        this.modal.dismiss()
    }

    close() {
        this.modal.close()
    }

    removePool() {
        this.loading = true
        this.poolsService.removePool(this.pool._id)
            .pipe(takeUntil(this.subject))
            .subscribe(
                (res) => {
                    this.loading = false
                    this.close()
                },
                (err) => {
                    this.loading = false
                    console.log(err)
                }
            )
    }

    ngOnDestroy(): void {
        this.subject.next()
        this.subject.complete()
    }
}
