import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Pool, PoolPaginationShed, Shed, User} from '../../../../api/graphql';
import {ShedsService} from '../services/sheds.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {PoolModalComponent} from '../pool-modal/pool-modal.component';
import {PoolStatusModalComponent} from '../pool-status-modal/pool-status-modal.component';
import {PoolRemoveModalComponent} from '../pool-remove-modal/pool-remove-modal.component';
import {UserStore} from '../../../services/user.store';

@Component({
    selector: 'app-pools-list',
    templateUrl: './pools-list.component.html',
    styleUrls: ['./pools-list.component.css']
})
export class PoolsListComponent implements OnInit, OnDestroy {

    idShed = null
    shed: Shed = null
    poolsPage: PoolPaginationShed = {poolList: [], totalNumPools: 0}
    filter = true
    data = []
    page = 1
    perPage = 12

    loading = false

    subject = new Subject<void>()

    user: User = null

    modalShedOptions: NgbModalOptions = {
        centered: true
    }

    constructor(
        private modal: NgbModal,
        private route: ActivatedRoute,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private userStore: UserStore,
        private shedsService: ShedsService
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
                this.idShed = params.id
                if (this.idShed) {
                    this.pageChanged(1)
                }
            })
    }

    pageChanged(page: number) {
        this.page = page
        this.getPoolsByShed((page - 1) * this.perPage, this.perPage, this.filter)
    }

    onChangeActive() {
        this.filter = !this.filter
        this.pageChanged(1)
    }

    onBack() {
        this.router.navigate(['/sheds']);
    }

    getPoolsByShed(skip: number, limit: number, filter: boolean) {
        this.loading = true
        this.shedsService.getPoolsByShed(this.idShed, skip, limit, filter)
            .pipe(takeUntil(this.subject))
            .subscribe(
                (res) => {
                    this.poolsPage = res.getPoolsByShed
                    this.shed = res.getShedByID
                    this.loading = false
                },
                error => {
                    console.log(error)
                    this.loading = false
                }
            )
    }

    openModal(pool: Pool = null): void {
        const poolModal: NgbModalRef = this.modal.open(PoolModalComponent, this.modalShedOptions)
        poolModal.componentInstance.idShed = this.idShed
        poolModal.componentInstance.shed = this.shed
        poolModal.componentInstance.pool = pool
        poolModal.result
            .then(() => {
                this.pageChanged(this.page)
            })
            .catch(() => {

            })
    }

    openChangeStatusModal(pool: Pool) {
        const poolModal: NgbModalRef = this.modal.open(PoolStatusModalComponent, this.modalShedOptions)
        poolModal.componentInstance.idShed = this.idShed
        poolModal.componentInstance.pool = pool
        poolModal.result
            .then(() => {
                this.pageChanged(this.page)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    openRemovePoolModal(pool: Pool) {
        const removeModal: NgbModalRef = this.modal.open(PoolRemoveModalComponent, this.modalShedOptions)
        removeModal.componentInstance.pool = pool
        removeModal.result
            .then(() => {
                this.pageChanged(this.page)
            })
            .catch(() => {

            })
    }

    goToCuyList(pool: Pool) {
        this.router.navigate(['pool', pool._id], {relativeTo: this.activatedRoute})
    }

    ngOnDestroy(): void {
        this.subject.next()
        this.subject.complete()
    }
}
