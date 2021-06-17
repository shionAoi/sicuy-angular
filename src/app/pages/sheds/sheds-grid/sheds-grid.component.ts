import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ShedModalComponent} from '../shed-modal/shed-modal.component';
import {Shed, ShedPagination, User} from '../../../../api/graphql';
import {ShedsService} from '../services/sheds.service';
import {ShedStatusModalComponent} from '../shed-status-modal/shed-status-modal.component';
import {ShedRemoveModalComponent} from '../shed-remove-modal/shed-remove-modal.component';
import {UserStore} from '../../../services/user.store';
import {ROUTES} from '../../../sidebar/sidebar.component';

@Component({
    selector: 'app-sheds-grid',
    templateUrl: './sheds-grid.component.html',
    styleUrls: ['./sheds-grid.component.css']
})
export class ShedsGridComponent implements OnInit, OnDestroy {

    shedPage: ShedPagination = {shedList: [], totalNumSheds: 0}
    filter = true
    data = []
    page = 1
    perPage = 12
    loading = false
    private unsubscribe$ = new Subject<void>()
    user: User = null
    private listTitles: any[];
    location: Location;

    modalShedOptions: NgbModalOptions = {
        centered: true
    }

    constructor(
        location: Location,
        private modal: NgbModal,
        private router: Router,
        private userStore: UserStore,
        private shedsService: ShedsService
    ) {
        this.location = location;
        this.userStore.user$
            .subscribe((user) => {
                this.user = user
            })
    }

    ngOnInit(): void {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        this.pageChanged(1)
    }

    getTitle() {
        let titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }
        for (let item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    pageChanged(page) {
        this.page = page
        this.getSheds((page - 1) * this.perPage, this.perPage, this.filter)
    }

    openModal(shed: Shed = null): void {
        const shedModal: NgbModalRef = this.modal.open(ShedModalComponent, this.modalShedOptions)
        shedModal.componentInstance.shed = shed
        shedModal.result
            .then(() => {
                this.pageChanged(this.page)
            })
            .catch(() => {

            })
    }

    onChangeActive() {
        this.filter = !this.filter
        this.pageChanged(1)
    }

    editShed(shed: Shed): void {
        this.openModal(shed)
    }

    removeShed(shed: Shed): void {
        const confirmModal: NgbModalRef = this.modal.open(ShedRemoveModalComponent, this.modalShedOptions)
        confirmModal.componentInstance.shed = shed
        confirmModal.result
            .then(() => {
                this.pageChanged(1)
            })
            .catch(() => {

            })
    }

    getSheds(skip: number, limit: number, filter: boolean): void {
        this.loading = true
        this.shedsService.getSheds(skip, limit, filter)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (shedPage) => {
                    this.loading = false
                    this.shedPage = shedPage
                },
                (err) => {
                    this.loading = false
                }
            )
    }

    changeStatus(shed: Shed) {
        const confirmModal: NgbModalRef = this.modal.open(ShedStatusModalComponent, {
            centered: true,
            size: 'sm'
        })
        confirmModal.componentInstance.shed = shed
        confirmModal.result
            .then(() => {
                this.pageChanged(1)
            })
            .catch(() => {

            })
    }

    goToPools(shed: Shed) {
        this.router.navigate([`/sheds`, shed._id], {state: {data: shed}})
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }
}
