import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Cuy, Pool} from '../../../../api/graphql';
import {Subject} from 'rxjs';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {takeUntil} from 'rxjs/operators';
import {CuysService} from '../services/cuys.service';

@Component({
    selector: 'app-cuy-remove-modal',
    templateUrl: './cuy-remove-modal.component.html',
    styleUrls: ['./cuy-remove-modal.component.css']
})
export class CuyRemoveModalComponent implements OnInit, OnDestroy {

    removeCuyF = new FormGroup({
        code: new FormControl('', [Validators.required])
    })

    loading = false
    code: string

    @Input() cuy: Cuy = null

    subject = new Subject<void>()

    constructor(private modal: NgbActiveModal,
                private cuysService: CuysService) {
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

    removeCuy() {
        this.loading = true
        console.log(this.cuy._id)
        this.cuysService.removeCuy(this.cuy._id)
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
