import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Cuy, CuyInput, CuyUpdate, DeathInput, Pool, SacaInput, User, WeightInput} from '../../../../api/graphql';
import {map, switchMap} from 'rxjs/operators';
import {GetCuysByPoolQuery} from './graphql/get-cuys-by-pool.query';
import {AddCuyMutation} from './graphql/add-cuy.mutation';
import {UpdateCuyMutation} from './graphql/update-cuy.mutation';
import {ActivateCuyMutation} from './graphql/activate-cuy.mutation';
import {DeactivateCuyMutation} from './graphql/deactivate-cuy.mutation';
import {RemoveCuyMutation} from './graphql/remove-cuy.mutation';
import {AddWeightToCuyMutation} from './graphql/add-weight-to-cuy.mutation';
import {UploadService} from '../../../services/upload.service';
import {AddCuyDeathMutation} from './graphql/add-cuy-death.mutation';
import {GetPoolByIdQuery} from './graphql/get-pool-by-id.query';
import {GetUsersQuery} from './graphql/get-users.query';
import {RegisterCuySacaQuery} from './graphql/register-cuy-saca.query';

@Injectable({
    providedIn: 'root'
})
export class CuysService {

    constructor(private getCuysByPoolQuery: GetCuysByPoolQuery,
                private updateCuyMutation: UpdateCuyMutation,
                private activateCuyMutation: ActivateCuyMutation,
                private deactivateCuyMutation: DeactivateCuyMutation,
                private removeCuyMutation: RemoveCuyMutation,
                private addWeightToCuyMutation: AddWeightToCuyMutation,
                private uploadService: UploadService,
                private addCuyDeathMutation: AddCuyDeathMutation,
                private getPoolByIdQuery: GetPoolByIdQuery,
                private getUsersQuery: GetUsersQuery,
                private registerCuySacaQuery: RegisterCuySacaQuery,
                private addCuyMutation: AddCuyMutation) {
    }

    getCuysByPool(idPool: string, filter: boolean, limit: number, skip: number): Observable<any> {
        return this.getCuysByPoolQuery.fetch({ idPool, filter, limit, skip }, { fetchPolicy: 'network-only' })
            .pipe(
                map((response) => response.data)
            )
    }

    addCuy(cuy: CuyInput): Observable<Cuy> {
        return this.addCuyMutation.mutate({ cuy })
            .pipe(
                map((response) => response.data.addCuy)
            )
    }

    updateCuy(idCuy: string, cuy: CuyUpdate) {
        return this.updateCuyMutation.mutate({ idCuy, update: cuy })
            .pipe(
                map((response) => response.data.updateCuy)
            )
    }

    updateCuyStatus(id: string, active: boolean): Observable<boolean> {
        if (active) {
            return this.activateCuyMutation.mutate({ idCuy: id })
                .pipe(
                    map((res) => res.data.activateCuy)
                )
        } else {
            return this.deactivateCuyMutation.mutate({ idCuy: id })
                .pipe(
                    map((res) => res.data.deactivateCuy)
                )
        }
    }

    removeCuy(id: string): Observable<any> {
        return this.removeCuyMutation.mutate({ idCuy: id })
            .pipe(
                map((res) => res.data.deleteCuy)
            )
    }

    addWeightToCuy(idCuy: string, file: File, weight: WeightInput): Observable<boolean> {
        return this.uploadService.uploadImage(file, idCuy)
            .pipe(
                switchMap((result: any) => {
                    console.log('result', result)
                    weight.photo = result.path
                    return this.addWeightToCuyMutation.mutate({ idCuy, weight })
                }),
                map((res) => res.data.addWeightToCuy)
            )
    }

    registerCuyDeath(idCuy: string, file: File, death: DeathInput): Observable<boolean> {
        if (file) {
            return this.uploadService.uploadFile(file, idCuy)
                .pipe(
                    switchMap((result: any) => {
                        console.log('register death', result)
                        death.reference_doc = result.path
                        return this.addCuyDeathMutation.mutate({ idCuy, death })
                    }),
                    map((res) => res.data.registerDeathCuy)
                )
        } else {
            return this.addCuyDeathMutation.mutate({ idCuy, death })
                .pipe(
                    map((res) => res.data.registerDeathCuy)
                )
        }
    }

    registerCuySaca(idCuy: string, file: File, saca: SacaInput): Observable<boolean> {
        if (file) {
            return this.uploadService.uploadFile(file, idCuy)
                .pipe(
                    switchMap((result: any) => {
                        console.log('register saca', result)
                        saca.reference_doc = result.path
                        return this.registerCuySacaQuery.mutate({ idCuy, saca })
                    }),
                    map((res) => res.data.registerSacaCuy)
                )
        } else {
            return this.registerCuySacaQuery.mutate({ idCuy, saca })
                .pipe(
                    map((res) => res.data.registerSacaCuy)
                )
        }
    }

    getPoolName(idPool: string): Observable<Pool> {
        return this.getPoolByIdQuery.fetch({ idPool }, { fetchPolicy: 'network-only' })
            .pipe(
                map((res) => res.data.getPoolByID)
            )
    }

    getUsers(): Observable<User[]> {
        return this.getUsersQuery.fetch({}, { fetchPolicy: 'network-only' })
            .pipe(
                map((res) => res.data.users)
            )
    }
}
