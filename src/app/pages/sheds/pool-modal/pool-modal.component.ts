import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Pool, Shed} from '../../../../api/graphql';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PoolsService} from '../services/pools.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-pool-modal',
    templateUrl: './pool-modal.component.html',
    styleUrls: ['./pool-modal.component.css']
})
export class PoolModalComponent implements OnInit, OnDestroy {

    loading = false

    poolF = new FormGroup({
        code: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        shed: new FormControl('', [Validators.required]),
        phase: new FormControl('', [Validators.required]),
        description: new FormControl('', [])
    })

    subject = new Subject<void>()

    @Input() idShed: string = null
    @Input() shed: Shed = null
    @Input() pool: Pool = null

    constructor(private modal: NgbActiveModal,
                private poolsService: PoolsService) {
    }

    ngOnInit(): void {
        if (this.pool !== null) {
            this.poolF.setValue({
                code: this.pool.code,
                type: this.pool.type,
                shed: this.shed.name,
                phase: this.pool.phase,
                description: this.pool.description,
            })
            this.codeAC.disable()
        }
        this.shedAC.disable()
    }

    get codeAC(): AbstractControl {
        return this.poolF.get('code')
    }

    get typeAC(): AbstractControl {
        return this.poolF.get('type')
    }

    get shedAC(): AbstractControl {
        return this.poolF.get('shed')
    }

    get descriptionAC(): AbstractControl {
        return this.poolF.get('description')
    }

    get phaseAC(): AbstractControl {
        return this.poolF.get('phase')
    }

    close(): void {
        this.modal.close('')
    }

    dismiss(): void {
        this.modal.dismiss()
    }

    saveShed(): void {
        this.loading = true
        this.poolF.disable()
        if (this.pool) {
            this.updatePool()
        } else {
            this.addPool()
        }
    }

    addPool(): void {
        this.poolsService.addPool({
            code: this.codeAC.value,
            type: this.typeAC.value,
            phase: this.phaseAC.value,
            shed: this.idShed,
            description: this.descriptionAC.value
        }).pipe(takeUntil(this.subject))
            .subscribe(
                value => {
                    this.loading = false
                    this.modal.close()
                },
                error => {
                    this.poolF.enable()
                    this.loading = false
                    console.log(error)
                }
            )
    }

    updatePool(): void {
        this.poolsService.updatePool(this.pool._id, {
            code: this.codeAC.value,
            type: this.typeAC.value,
            phase: this.phaseAC.value,
            description: this.descriptionAC.value
        }).pipe(takeUntil(this.subject))
            .subscribe(
                value => {
                    this.loading = false
                    this.modal.close()
                },
                error => {
                    this.poolF.enable()
                    this.loading = false
                }
            )
    }

    ngOnDestroy(): void {
        this.subject.next()
        this.subject.complete()
    }

}
