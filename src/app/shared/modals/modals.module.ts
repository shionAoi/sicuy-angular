import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShedStatusModalComponent} from '../../pages/sheds/shed-status-modal/shed-status-modal.component';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        ShedStatusModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class ModalsModule {
}
