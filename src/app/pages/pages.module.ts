import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from './user/user.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {RouterModule} from '@angular/router';
import {pagesRoutes} from './pages.routing';
import {CardCategoryValueComponent} from './dashboard/card-category-value/card-category-value.component';
import {ShedsComponent} from './sheds/sheds.component';
import {BirthRateComponent} from './birth-rate/birth-rate.component';
import {DeathRateComponent} from './death-rate/death-rate.component';
import {CommonModule} from '@angular/common';
import {ShedsGridComponent} from './sheds/sheds-grid/sheds-grid.component';
import {ShedsGridItemComponent} from './sheds/sheds-grid-item/sheds-grid-item.component';
import {PoolsListComponent} from './sheds/pools-list/pools-list.component';
import {ShedModalComponent} from './sheds/shed-modal/shed-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {ShedStatusModalComponent} from './sheds/shed-status-modal/shed-status-modal.component';
import { PoolModalComponent } from './sheds/pool-modal/pool-modal.component';
import { UserListComponent } from './user-list/user-list.component';
import { UpdateUserComponent } from './user-list/update-user/update-user.component';
import { ShedRemoveModalComponent } from './sheds/shed-remove-modal/shed-remove-modal.component';
import { CuyGenrePipe } from './sheds/pipes/cuy-genre.pipe';
import { PoolStatusModalComponent } from './sheds/pool-status-modal/pool-status-modal.component';
import { PoolRemoveModalComponent } from './sheds/pool-remove-modal/pool-remove-modal.component';
import { ButtonLoadingComponent } from './shared/button-loading/button-loading.component';
import { CuyListComponent } from './sheds/cuy-list/cuy-list.component';
import { CuyModalComponent } from './sheds/cuy-modal/cuy-modal.component';
import {NgxPermissionsModule} from 'ngx-permissions';
import { CuyStatusModalComponent } from './sheds/cuy-status-modal/cuy-status-modal.component';
import { CuyRemoveModalComponent } from './sheds/cuy-remove-modal/cuy-remove-modal.component';
import { UpdateAccessComponent } from './user-list/update-access/update-access.component';
import { RolsComponent } from './user/rols/rols.component';
import { OperationsComponent } from './user/operations/operations.component';
import { AddRolComponent } from './user/rols/add-rol/add-rol.component';
import { AssignRolComponent } from './user-list/assign-rol/assign-rol.component';
import { MobilizeCuyComponent } from './sheds/mobilize-cuy/mobilize-cuy.component';
import { PullOutRateComponent } from './pull-out-rate/pull-out-rate.component';
import { CuyWeightModalComponent } from './sheds/cuy-weight-modal/cuy-weight-modal.component';
import { SrcImagePipe } from './sheds/pipes/src-image.pipe';
import { CuyDeathModalComponent } from './sheds/cuy-death-modal/cuy-death-modal.component';
import { CuySacaModalComponent } from './sheds/cuy-saca-modal/cuy-saca-modal.component';
import { DocumentModalComponent } from './death-rate/document-modal/document-modal.component';
import { SecureDomPipe } from './death-rate/pipes/secure-dom.pipe';


@NgModule({
    declarations: [
        DashboardComponent,
        UserComponent,
        NotificationsComponent,
        CardCategoryValueComponent,
        ShedsComponent,
        BirthRateComponent,
        DeathRateComponent,
        ShedsGridComponent,
        ShedsGridItemComponent,
        PoolsListComponent,
        ShedModalComponent,
        ShedStatusModalComponent,
        PoolModalComponent,
        UserListComponent,
        UpdateUserComponent,
        ShedRemoveModalComponent,
        CuyGenrePipe,
        PoolStatusModalComponent,
        PoolRemoveModalComponent,
        ButtonLoadingComponent,
        CuyListComponent,
        CuyModalComponent,
        CuyStatusModalComponent,
        CuyRemoveModalComponent,
        UpdateAccessComponent,
        RolsComponent,
        OperationsComponent,
        AddRolComponent,
        AssignRolComponent,
        MobilizeCuyComponent,
        PullOutRateComponent,
        CuyWeightModalComponent,
        SrcImagePipe,
        CuyDeathModalComponent,
        CuySacaModalComponent,
        DocumentModalComponent,
        SecureDomPipe,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        RouterModule.forChild(pagesRoutes),
        FormsModule,
        NgxPaginationModule,
        NgxPermissionsModule,
    ],
    exports: [],
    providers: [],
})
export class PagesModule {


}
