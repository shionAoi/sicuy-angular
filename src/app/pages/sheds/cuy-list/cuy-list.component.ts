import {Component, OnDestroy, OnInit} from '@angular/core';
import {Cuy, CuyPagination, CuyPaginationPool, Pool, PoolPaginationShed, Shed, User} from '../../../../api/graphql';
import {Subject} from 'rxjs';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {ShedsService} from '../services/sheds.service';
import {takeUntil} from 'rxjs/operators';
import {CuysService} from '../services/cuys.service';
import {CuyModalComponent} from '../cuy-modal/cuy-modal.component';
import {UserStore} from '../../../services/user.store';
import {CuyStatusModalComponent} from '../cuy-status-modal/cuy-status-modal.component';
import {CuyRemoveModalComponent} from '../cuy-remove-modal/cuy-remove-modal.component';
import {MobilizeCuyComponent} from '../mobilize-cuy/mobilize-cuy.component';
import {CuyWeightModalComponent} from '../cuy-weight-modal/cuy-weight-modal.component';
import {CuyDeathModalComponent} from '../cuy-death-modal/cuy-death-modal.component';
import {CuySacaModalComponent} from '../cuy-saca-modal/cuy-saca-modal.component';

@Component({
    selector: 'app-cuy-list',
    templateUrl: './cuy-list.component.html',
    styleUrls: ['./cuy-list.component.css']
})
export class CuyListComponent implements OnInit, OnDestroy {

    idPool = null
    pool: Pool = null
    cuysPage: CuyPaginationPool = {cuyList: [], totalNumCuys: 0}
    filter = true
    page = 1
    perPage = 10

    loading = false

    subject = new Subject<void>()

    user: User = null

    constructor(
        private modal: NgbModal,
        private route: ActivatedRoute,
        private cuysService: CuysService,
        private userStore: UserStore,
        private shedsService: ShedsService,
        private router: Router
    ) {
        this.userStore.user$
            .subscribe((user) => {
                this.user = user
            })
    }

    ngOnInit(): void {
        this.route.params
            .pipe(takeUntil(this.subject))
            .subscribe((params) => {
                this.idPool = params.id
                if (this.idPool) {
                    this.pageChanged(1)
                }
            })
    }

    onBackSheds() {
        const root = this.router.url.split('/')
        this.router.navigate([`/${root[1]}`])
    }

    onBackPool() {
        const root = this.router.url.split('/')
        this.router.navigate([`/${root[1]}`, `${root[2]}`])
    }

    pageChanged(page: number) {
        this.page = page
        this.getCuysByPool((page - 1) * this.perPage, this.perPage, this.filter)
    }

    onChangeActive() {
        this.filter = !this.filter
        this.pageChanged(1)
    }

    getCuysByPool(skip: number, limit: number, filter: boolean) {
        this.loading = true
        this.cuysService.getCuysByPool(this.idPool, filter, skip, limit)
            .pipe(takeUntil(this.subject))
            .subscribe(
                (res) => {
                    this.cuysPage = res.getAllCuysOfPool
                    this.pool = res.getPoolByID
                    this.loading = false
                },
                error => {
                    console.log(error)
                    this.loading = false
                }
            )
    }

    openModal(cuy: Cuy = null): void {
        const poolModal: NgbModalRef = this.modal.open(CuyModalComponent, {size: 'lg'})
        poolModal.componentInstance.pool = this.pool
        poolModal.componentInstance.cuy = cuy
        poolModal.result
            .then(() => {
                this.pageChanged(this.page)
            })
            .catch(() => {

            })
    }

    openChangeStatusModal(cuy: Cuy) {
        const poolModal: NgbModalRef = this.modal.open(CuyStatusModalComponent, {
            centered: true
        })
        poolModal.componentInstance.cuy = cuy
        poolModal.result
            .then(() => {
                this.pageChanged(this.page)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    openRemovePoolModal(cuy: Cuy) {
        const removeModal: NgbModalRef = this.modal.open(CuyRemoveModalComponent, {})
        removeModal.componentInstance.cuy = cuy
        removeModal.result
            .then(() => {
                this.pageChanged(this.page)
            })
            .catch(() => {

            })
    }

    openMobilizeModal(cuy: Cuy) {
        const mobilizeCuyModal: NgbModalRef = this.modal.open(MobilizeCuyComponent, {size: 'ms'})
        mobilizeCuyModal.componentInstance.cuy = cuy
        mobilizeCuyModal.result
            .then(() => {
                this.pageChanged(this.page)
            })
            .catch(() => {

            })
    }

    openWeightModal(cuy: Cuy) {
        const weightCuyModal: NgbModalRef = this.modal.open(CuyWeightModalComponent, {size: 'ms'})
        weightCuyModal.componentInstance.cuy = cuy
        weightCuyModal.result
            .then(() => {
                this.pageChanged(this.page)
            })
            .catch(() => {

            })
    }

    openDeathModal(cuy: Cuy) {
        const deathCuyModal: NgbModalRef = this.modal.open(CuyDeathModalComponent, {size: 'ms'})
        deathCuyModal.componentInstance.cuy = cuy
        deathCuyModal.result
            .then(() => {
                this.pageChanged(this.page)
            })
            .catch(() => {

            })
    }

    openSacaModal(cuy: Cuy) {
        const sacaCuyModal: NgbModalRef = this.modal.open(CuySacaModalComponent, {size: 'ms'})
        sacaCuyModal.componentInstance.cuy = cuy
        sacaCuyModal.result
            .then(() => {
                this.pageChanged(this.page)
            })
            .catch(() => {

            })
    }

    ngOnDestroy(): void {
        this.subject.next()
        this.subject.complete()
    }
}
