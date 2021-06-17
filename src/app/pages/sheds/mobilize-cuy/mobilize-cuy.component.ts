import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Cuy, Pool, Shed} from '../../../../api/graphql';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {map, takeUntil} from 'rxjs/operators';
import {MobilizeCuyService} from '../services/mobilize-cuy.service';
import moment from 'moment';
import {UploadService} from '../../../services/upload.service';

@Component({
    selector: 'app-mobilize-cuy',
    templateUrl: './mobilize-cuy.component.html',
    styleUrls: ['./mobilize-cuy.component.css']
})
export class MobilizeCuyComponent implements OnInit, OnDestroy {

    mobilizeCuyF = new FormGroup({
        initialShed: new FormControl('', []),
        initialPool: new FormControl('', []),
        newShed: new FormControl('', [Validators.required]),
        newPool: new FormControl('', [Validators.required, Validators.nullValidator]),
        mobilizationDate: new FormControl('', [Validators.required]),
        document: new FormControl('', [Validators.required]),
        reason: new FormControl('', [])
    })

    shed: Shed = null
    pool: Pool = null
    activeSheds: Shed[] = []
    activePools: Pool[] = []
    documentFile: File = null

    shedSelected: Shed = null
    poolSelected: Pool = null

    loading = false

    @Input() cuy: Cuy = null

    subject = new Subject<void>()

    constructor(private modal: NgbActiveModal,
                private router: Router,
                private mobilizeCuyService: MobilizeCuyService) {
    }

    get initialShedAC(): AbstractControl {
        return this.mobilizeCuyF.get('initialShed')
    }

    get initialPoolAC(): AbstractControl {
        return this.mobilizeCuyF.get('initialPool')
    }

    get newShedAC(): AbstractControl {
        return this.mobilizeCuyF.get('newShed')
    }

    get newPoolAC(): AbstractControl {
        return this.mobilizeCuyF.get('newPool')
    }

    get mobilizationDateAC(): AbstractControl {
        return this.mobilizeCuyF.get('mobilizationDate')
    }

    get documentAC(): AbstractControl {
        return this.mobilizeCuyF.get('document')
    }

    get reasonAC(): AbstractControl {
        return this.mobilizeCuyF.get('reason')
    }

    ngOnInit(): void {
        this.initialShedAC.disable()
        this.initialPoolAC.disable()
        const [idShed, idPool] = this.getShedAndPoolId()
        this.getShedAndPoolById(idShed, idPool)
        this.getShedsAndPools()
    }

    getShedAndPoolById(idShed: string, idPool: string) {
        this.mobilizeCuyService.getShedAndPoolById(idShed, idPool)
            .pipe(takeUntil(this.subject))
            .subscribe(
                (data) => {
                    this.shed = data.getShedByID
                    this.pool = data.getPoolByID
                    this.mobilizeCuyF.patchValue({
                        initialShed: this.shed.name,
                        initialPool: this.pool.code
                    })
                },
                error => {
                    console.log(error)
                }
            )
    }

    getShedsAndPools() {
        this.mobilizeCuyService.getShedsAndPools()
            .pipe(takeUntil(this.subject))
            .subscribe(
                (shedPage) => {
                    this.activeSheds = shedPage.shedList
                },
                error => {
                    this.activeSheds = []
                    console.log(error)
                }
            )
    }

    dismiss() {
        this.modal.dismiss()
    }

    close() {
        this.modal.close()
    }

    getShedAndPoolId(): string [] {
        return [this.router.url.substring(7, 31), this.router.url.substring(37, this.router.url.length)]
    }

    onSelectShed(idShed: string) {
        const shed = this.activeSheds.find((item) => item._id === idShed)
        if (shed) {
            this.activePools = shed.pools.poolList.filter(pool => pool._id !== this.pool._id)
        }
    }

    mobilizeCuy() {
        this.mobilizeCuyService.mobilizeCuy(this.documentFile, {
            cuy: this.cuy._id,
            origin: this.pool._id,
            destination: this.newPoolAC.value,
            date: moment(this.mobilizationDateAC.value).toISOString(),
            reason: this.reasonAC.value,
            reference_doc: ''
        })
            .pipe(takeUntil(this.subject))
            .subscribe(
                (mobilization) => {
                    mobilization.subscribe(
                        (mob) => {
                            this.loading = false
                            this.modal.close()
                        },
                        (err) => {
                            this.mobilizeCuyF.enable()
                            this.loading = false
                            console.log(err)
                        }
                    )
                },
                err => {
                    this.mobilizeCuyF.enable()
                    this.loading = false
                    console.log(err)
                }
            )
    }

    changeFile(event) {
        if (event && event.target.files) {
            this.documentFile = event.target.files[0]
        }
    }

    ngOnDestroy(): void {
        this.subject.next()
        this.subject.complete()
    }
}


