import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Cuy} from '../../../../api/graphql';
import {Subject} from 'rxjs';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CuysService} from '../services/cuys.service';
import {takeUntil} from 'rxjs/operators';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-cuy-weight-modal',
    templateUrl: './cuy-weight-modal.component.html',
    styleUrls: ['./cuy-weight-modal.component.css']
})
export class CuyWeightModalComponent implements OnInit, OnDestroy {

    cuyWeightF = new FormGroup({
        lastWeight: new FormControl('', []),
        newWeight: new FormControl('', [Validators.required, Validators.nullValidator])
    })
    error = null
    loading = false
    active = false
    imageToUpload: File = null
    imageSrc = ''

    @Input() cuy: Cuy = null

    subject = new Subject<void>()

    constructor(private modal: NgbActiveModal,
                private cuysService: CuysService) {
    }

    get lastWeightAC(): AbstractControl {
        return this.cuyWeightF.get('lastWeight')
    }

    get newWeightAC(): AbstractControl {
        return this.cuyWeightF.get('newWeight')
    }

    ngOnInit(): void {
        this.lastWeightAC.setValue(this.cuy.current_weight)
        this.lastWeightAC.disable()
        this.active = this.cuy.active
    }

    dismiss(reason?: string) {
        this.modal.dismiss(reason)
    }

    close(result?: string) {
        this.modal.close(result)
    }

    saveWeight() {
        this.loading = true
        this.error = null
        this.cuysService.addWeightToCuy(this.cuy._id, this.imageToUpload, {
            weight: this.newWeightAC.value,
            photo: ''
        }).pipe(takeUntil(this.subject)).subscribe(
            (res) => {
                this.loading = false
                this.close()
            },
            (err) => {
                this.loading = false
                this.error = 'error'
                console.log(err)
            }
        )
    }

    onFileChange(event) {
        if (event && event.target.files) {
            this.imageToUpload = event.target.files[0]
            const reader = new FileReader()
            reader.onload = e => this.imageSrc = reader.result as string
            reader.readAsDataURL(this.imageToUpload)
        } else {
            this.imageSrc = ''
            this.imageToUpload = null
        }
    }

    clearFile() {
        this.imageSrc = ''
        this.imageToUpload = null
    }

    ngOnDestroy(): void {
        this.subject.next()
        this.subject.complete()
    }
}
