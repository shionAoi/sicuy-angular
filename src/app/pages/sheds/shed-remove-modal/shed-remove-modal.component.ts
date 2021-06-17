import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Shed} from '../../../../api/graphql';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ShedsService} from '../services/sheds.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-shed-remove-modal',
    templateUrl: './shed-remove-modal.component.html',
    styleUrls: ['./shed-remove-modal.component.css']
})
export class ShedRemoveModalComponent implements OnInit, OnDestroy {

    @Input() shed: Shed = null

    loading = false
    cod: string

    removeShedF = new FormGroup({
        code: new FormControl('', [Validators.required])
    })

    subject = new Subject()

    constructor(private modal: NgbActiveModal,
                private shedsService: ShedsService) {
    }

    get code(): AbstractControl {
        return this.removeShedF.get('code')
    }

    onKey(event) {
        this.cod = event.target.value
    }

    ngOnInit(): void {

    }

    close(): void {
        this.modal.close('')
    }

    dismiss(): void {
        this.modal.dismiss()
    }

    removeShed() {
        this.loading = true
        this.shedsService.removeShed(this.shed._id)
            .pipe(takeUntil(this.subject))
            .subscribe(
                (removed) => {
                    this.loading = false
                    this.close()
                },
                (error) => {
                    this.loading = false
                    console.log(error)
                }
            )
    }

    ngOnDestroy(): void {
        this.subject.next()
        this.subject.complete()
    }
}
