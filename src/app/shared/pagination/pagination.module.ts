import {NgModule} from '@angular/core';

import {PaginationControlsComponent} from './pagination-controls.component';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        PaginationControlsComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PaginationControlsComponent
    ],
    providers: [],
})
export class PaginationModule {
}
