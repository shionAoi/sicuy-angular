import {Component, Input, OnInit} from '@angular/core';
import {Cuy, GenreCuy, Pool} from '../../../../api/graphql';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {CuysService} from '../services/cuys.service';
import {Subject} from 'rxjs';
import moment from 'moment';

@Component({
    selector: 'app-cuy-modal',
    templateUrl: './cuy-modal.component.html',
    styleUrls: ['./cuy-modal.component.css']
})
export class CuyModalComponent implements OnInit {

    cuyF = new FormGroup({
        poolCode: new FormControl('', [Validators.required]),
        earring: new FormControl('', [Validators.required]),
        race: new FormControl('', [Validators.required]),
        genre: new FormControl('', [Validators.required]),
        color: new FormControl('', [Validators.required]),
        birthDate: new FormControl('', [Validators.required]),
        description: new FormControl('', []),
        observations: new FormControl('', [])
    })

    loading = false
    error: string = null

    @Input() cuy: Cuy = null
    @Input() pool: Pool = null

    subject = new Subject<void>()

    genres = GenreCuy

    constructor(private modal: NgbActiveModal,
                private cuysService: CuysService) {
    }

    ngOnInit(): void {
        if (this.cuy) {
            this.cuyF.setValue({
                poolCode: this.pool.code,
                earring: this.cuy.earring,
                race: this.cuy.race,
                genre: this.cuy.genre,
                color: this.cuy.color,
                birthDate: moment(this.cuy.birthday_date).local().format('yyyy-MM-DD'),
                description: this.cuy.description,
                observations: this.cuy.observation
            })
        } else {
            this.poolCodeAC.setValue(this.pool.code)
        }
        this.poolCodeAC.disable()
    }

    get poolCodeAC(): AbstractControl {
        return this.cuyF.get('poolCode')
    }

    get earringAC(): AbstractControl {
        return this.cuyF.get('earring')
    }

    get raceAC(): AbstractControl {
        return this.cuyF.get('race')
    }

    get genreAC(): AbstractControl {
        return this.cuyF.get('genre')
    }

    get colorAC(): AbstractControl {
        return this.cuyF.get('color')
    }

    get birthDateAC(): AbstractControl {
        return this.cuyF.get('birthDate')
    }

    get descriptionAC(): AbstractControl {
        return this.cuyF.get('description')
    }

    get observationsAC(): AbstractControl {
        return this.cuyF.get('observations')
    }

    dismiss() {
        this.modal.dismiss()
    }

    close() {
        this.modal.close()
    }

    saveCuy() {
        this.loading = true
        this.cuyF.disable()
        if (this.cuy) {
            this.updateCuy()
        } else {
            this.addCuy()
        }
    }

    updateCuy(): void {
        this.cuysService.updateCuy(this.cuy._id, {
            earring: this.earringAC.value,
            race: this.raceAC.value,
            genre: this.genreAC.value,
            color: this.colorAC.value,
            birthday_date: moment(this.birthDateAC.value).toISOString(),
            description: this.descriptionAC.value,
            observation: this.observationsAC.value,
        }).pipe(takeUntil(this.subject))
            .subscribe(
                value => {
                    this.loading = false
                    this.modal.close()
                },
                error => {
                    this.cuyF.enable()
                    this.loading = false
                    console.log(error)
                }
            )
    }

    addCuy(): void {
        this.cuysService.addCuy({
            pool: this.pool._id,
            earring: this.earringAC.value,
            race: this.raceAC.value,
            genre: this.genreAC.value,
            color: this.colorAC.value,
            birthday_date: moment(this.birthDateAC.value).toISOString(),
            description: this.descriptionAC.value,
            observation: this.observationsAC.value,
        }).pipe(takeUntil(this.subject))
            .subscribe(
                value => {
                    this.loading = false
                    this.modal.close()
                },
                error => {
                    this.error = error.toString().search('E11000') > -1 ? 'Arete ya existe' : 'Ocurrio un error. Intentelo de nuevo o contactese con el administrador';
                    this.loading = false
                    this.cuyF.enable()
                }
            )
    }
}
