import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Cuy, User} from '../../../../api/graphql';
import {Subject} from 'rxjs';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CuysService} from '../services/cuys.service';
import {takeUntil} from 'rxjs/operators';
import moment from 'moment';
import {Router} from '@angular/router';

@Component({
    selector: 'app-cuy-death-modal',
    templateUrl: './cuy-death-modal.component.html',
    styleUrls: ['./cuy-death-modal.component.css']
})
export class CuyDeathModalComponent implements OnInit, OnDestroy {

    cuyDeathF = new FormGroup({
        shed: new FormControl('', []),
        earring: new FormControl('', []),
        user: new FormControl('', [Validators.required]),
        document: new FormControl('', []),
        deathDate: new FormControl('', [Validators.required]),
        reason: new FormControl('', [Validators.required])
    })
    error = null
    loading = false
    file: File = null
    users: User[] = []

    subject = new Subject<void>()

    @Input() cuy: Cuy = null

    constructor(private modal: NgbActiveModal,
                private router: Router,
                private cuysService: CuysService) {
    }

    get shedAC(): AbstractControl {
        return this.cuyDeathF.get('shed')
    }

    get earringAC(): AbstractControl {
        return this.cuyDeathF.get('earring')
    }

    get userAC(): AbstractControl {
        return this.cuyDeathF.get('user')
    }

    get documentAC(): AbstractControl {
        return this.cuyDeathF.get('document')
    }

    get deathDateAC(): AbstractControl {
        return this.cuyDeathF.get('deathDate')
    }

    get reasonAC(): AbstractControl {
        return this.cuyDeathF.get('reason')
    }

    ngOnInit(): void {
        this.getPoolCode()
        this.getUsers()
        this.earringAC.setValue(this.cuy.earring)
        this.shedAC.disable()
        this.earringAC.disable()
    }

    getPoolCode() {
        const [idShed, idPool] = this.getShedAndPoolId()
        this.cuysService.getPoolName(idPool)
            .pipe(takeUntil(this.subject))
            .subscribe(
                (res) => {
                    this.shedAC.setValue(res.code)
                },
                error => {
                    this.shedAC.setValue('No se pudo recuperar')
                }
            )
    }

    getUsers() {
        this.cuysService.getUsers()
            .pipe(takeUntil(this.subject))
            .subscribe(
                (res) => {
                    this.users = res
                },
                error => {
                    this.users = []
                }
            )
    }

    dismiss(reason?: string) {
        this.modal.dismiss(reason)
    }

    close(result?: string) {
        this.modal.close(result)
    }

    saveDeath() {
        this.loading = true
        this.error = null
        this.cuysService.registerCuyDeath(this.cuy._id, this.file, {
            certified_by: this.userAC.value,
            reference_doc: '',
            date: moment(this.deathDateAC.value).toISOString(),
            reason: this.reasonAC.value
        }).pipe(takeUntil(this.subject))
            .subscribe(
                (res) => {
                    this.loading = false
                    this.close()
                },
                err => {
                    this.loading = false
                    this.error = err.toString()
                }
            )
    }

    onFileChange(event) {
        if (event.target.files && event.target.files.length) {
            this.file = event.target.files[0]
        } else {
            this.file = null
        }
    }

    getShedAndPoolId(): string [] {
        return [this.router.url.substring(7, 31), this.router.url.substring(37, this.router.url.length)]
    }

    ngOnDestroy(): void {
        this.subject.next()
        this.subject.complete()
    }
}
