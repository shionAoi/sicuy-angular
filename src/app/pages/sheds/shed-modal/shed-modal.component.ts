import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Shed} from '../../../../api/graphql';
import {ShedsService} from '../services/sheds.service';

@Component({
    selector: 'app-shed-modal',
    templateUrl: './shed-modal.component.html',
    styleUrls: ['./shed-modal.component.css']
})
export class ShedModalComponent implements OnInit {

    loading = false

    shedF = new FormGroup({
        code: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        details: new FormControl('', [])
    })

    @Input() shed: Shed = null

    constructor(private modal: NgbActiveModal,
                private shedsService: ShedsService) {
    }

    ngOnInit(): void {
        if (this.shed !== null) {
            this.shedF.setValue({
                code: this.shed.code,
                name: this.shed.name,
                details: this.shed.details
            })
            this.codeAC.disable()
        }
    }

    get codeAC(): AbstractControl {
        return this.shedF.get('code')
    }

    get nameAC(): AbstractControl {
        return this.shedF.get('name')
    }

    get detailsAC(): AbstractControl {
        return this.shedF.get('details')
    }

    close(): void {
        this.modal.close('')
    }

    dismiss(): void {
        this.modal.dismiss()
    }

    saveShed(): void {
        this.loading = true
        this.shedF.disable()
        if (this.shed) {
            this.updateShed()
        } else {
            this.addShed()
        }
    }

    addShed(): void {
        this.shedsService.addShed({
            code: this.codeAC.value,
            name: this.nameAC.value,
            details: this.detailsAC.value
        }).subscribe(
            value => {
                this.modal.close()
            },
            error => {
                this.shedF.enable()
                this.loading = false
                console.log(error)
            },
            () => {
                this.loading = false
            }
        )
    }

    updateShed(): void {
        this.shedsService.updateShed(this.shed._id, {
            code: this.codeAC.value,
            name: this.nameAC.value,
            details: this.detailsAC.value
        }).subscribe(
            value => {
                this.modal.close()
            },
            error => {
                this.shedF.enable()
                this.loading = false
            },
            () => {
                this.loading = false
            }
        )
    }
}
