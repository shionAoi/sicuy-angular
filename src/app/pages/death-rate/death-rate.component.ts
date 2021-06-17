import {Component, Inject, LOCALE_ID, OnDestroy, OnInit} from '@angular/core';
import {CuyReportPagination, Pool, Shed, ShedPagination} from '../../../api/graphql';
import {DeathRateService} from './services/death-rate.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import moment from 'moment';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DocumentModalComponent} from './document-modal/document-modal.component';

@Component({
    selector: 'app-death-rate',
    templateUrl: './death-rate.component.html',
    styleUrls: ['./death-rate.component.css']
})
export class DeathRateComponent implements OnInit, OnDestroy {

    idShedSelected: string = undefined
    idPoolSelected: string = undefined
    startDateFilter = ''
    endDateFilter = ''
    reason: string = undefined

    applyShedFilter = false
    newState = false
    newStatePool = false

    shedPagination: ShedPagination = {
        shedList: [],
        totalNumSheds: 0
    }
    cuyPagination: CuyReportPagination = {
        cuyList: [],
        totalNumCuys: 0
    }
    shedOptions: Shed[] = []
    poolOptions: Pool[] = []
    currentPage = 1
    pageSize = 10

    subject = new Subject<void>()
    error: string = null

    constructor(
        private modal: NgbModal,
        private deathRateService: DeathRateService
    ) {
    }

    ngOnInit(): void {
        const today = new Date()
        today.setMonth(today.getMonth() - 1)
        this.startDateFilter = moment(today).format('YYYY-MM-DD').toString()
        this.endDateFilter = moment(new Date()).format('YYYY-MM-DD').toString()
        this.getCuyList(
            this.idShedSelected,
            this.idPoolSelected,
            new Date(this.startDateFilter).toISOString(),
            new Date(this.endDateFilter).toISOString(),
            this.reason,
            0,
            this.pageSize
        )
        this.getShedsAndPools()
    }

    dismissAlert() {
        this.error = null
    }

    applyShed() {
        this.applyShedFilter = !this.applyShedFilter
        if (!this.applyShedFilter) {
            this.newState = false
            this.newStatePool = false
            this.idShedSelected = undefined
            this.idPoolSelected = undefined
            this.pageChanged(this.currentPage)
        }
    }

    onSelectShed(idShed: string) {
        this.newState = true
        this.idShedSelected = idShed
        this.pageChanged(this.currentPage)
        this.poolOptions = this.shedOptions.find((shed) => shed._id === idShed).pools.poolList
    }

    onSelectPool(idPool: string) {
        this.newStatePool = true
        this.idPoolSelected = idPool
        this.pageChanged(this.currentPage)
    }

    onCleanSearch(reason: string) {
        if (reason === '') {
            this.reason = undefined
            this.pageChanged(this.currentPage)
        }
    }

    onReasonSearch(reason: string) {
        this.reason = reason
        this.pageChanged(this.currentPage)
    }

    pageChanged(page: number) {
        this.currentPage = page
        this.getCuyList(
            this.idShedSelected,
            this.idPoolSelected,
            new Date(this.startDateFilter).toISOString(),
            new Date(this.endDateFilter).toISOString(),
            this.reason,
            (page - 1) * this.pageSize,
            this.pageSize
        )
    }

    getCuyList(
        idShed?: string,
        idPool?: string,
        dateFrom?: string,
        dateTo?: string,
        reason?: string,
        skip?: number,
        limit?: number
    ) {
        this.deathRateService.getCuyList(
            idShed,
            idPool,
            dateFrom,
            dateTo,
            reason,
            skip,
            limit
        )
            .pipe(takeUntil(this.subject))
            .subscribe(
                (cuys) => {
                    if (cuys === null) {
                        this.cuyPagination = {
                            totalNumCuys: 0,
                            cuyList: []
                        }
                    } else {
                        this.cuyPagination = cuys
                    }
                },
                (err) => {
                    this.error = 'Algo salio mal vuelve a intentarlo o contacta a el administrador';
                }
            )
    }

    getShedsAndPools() {
        this.deathRateService.getShedsAndPools(true)
            .pipe(takeUntil(this.subject))
            .subscribe(
                (shedPagination) => {
                    this.shedPagination = shedPagination
                    this.shedOptions = this.shedPagination.shedList
                    this.poolOptions = []
                },
                error => {
                    this.error = 'Algo salio mal vuelve a intentarlo o contacta a el administrador';
                }
            )
    }

    openDocument(document: string = ''): void {
        document = `https://docs.google.com/gview?url=${document}&embedded=true`
        const documentModal: NgbModalRef = this.modal.open(DocumentModalComponent, {size: 'lg'});
        documentModal.componentInstance.document = document
        documentModal.result
            .then(() => {
                console.log('OK')
            })
            .catch((err) => {
                if (err) {
                    this.error = 'Algo salio mal vuelve a intentarlo o contacta a el administrador'
                }
            })
    }

    ngOnDestroy(): void {
        this.subject.next()
        this.subject.complete()
    }
}
