import {Injectable} from '@angular/core';
import {AddShedMutation} from './graphql/add-shed.mutation';
import {Shed, ShedInput, ShedPagination} from '../../../../api/graphql';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UpdateShedMutation} from './graphql/update-shed.mutation';
import {DeactivateShedMutation} from './graphql/deactivate-shed.mutation';
import {GetShedsQuery} from './graphql/get-sheds.query';
import {ActivateShedMutation} from './graphql/activate-shed.mutation';
import {GetPoolsByShedQuery} from './graphql/get-pools-by-shed.query';
import {RemoveShedMutation} from './graphql/remove-shed.mutation';

@Injectable({
    providedIn: 'root'
})
export class ShedsService {

    constructor(private addShedMutation: AddShedMutation,
                private updateShedMutation: UpdateShedMutation,
                private deactivateShedMutation: DeactivateShedMutation,
                private activateShedMutation: ActivateShedMutation,
                private deactivateShedMutation1: DeactivateShedMutation,
                private getPoolsByShedQuery: GetPoolsByShedQuery,
                private removeShedMutation: RemoveShedMutation,
                private getShedsQuery: GetShedsQuery) {
    }

    getSheds(skip: number, limit: number, filter: boolean): Observable<ShedPagination> {
        return this.getShedsQuery.fetch({ skip, limit, filter }, { fetchPolicy: 'network-only' })
            .pipe(
                map((response) => response.data.sheds)
            )
    }

    addShed(shed: ShedInput): Observable<Shed> {
        return this.addShedMutation.mutate({ shed: shed })
            .pipe(
                map((response) => response.data.addShed)
            )
    }

    updateShed(idShed: string, shed: ShedInput): Observable<Shed> {
        return this.updateShedMutation.mutate({ idShed: idShed, shed: shed })
            .pipe(
                map((response) => response.data.updateShed)
            )
    }

    updateShedStatus(idShed: string, newStatus: boolean): Observable<boolean> {
        if (newStatus) {
            return this.activateShedMutation.mutate({ idShed: idShed })
                .pipe(
                    map((response) => response.data.activateShed)
                )
        } else {
            return this.deactivateShedMutation.mutate({ idShed: idShed })
                .pipe(
                    map((response) => response.data.deactivateShed)
                )
        }
    }

    getPoolsByShed(idShed: string, skip: number, limit: number, filter: boolean): Observable<any> {
        return this.getPoolsByShedQuery.fetch({ idShed, skip, filter, limit }, { fetchPolicy: 'network-only' })
            .pipe(
                map((response) => ({ getPoolsByShed: response.data.getPoolsByShed, getShedByID: response.data.getShedByID }))
            )
    }

    removeShed(idShed: string): Observable<boolean> {
        return this.removeShedMutation.mutate({ idShed })
            .pipe(
                map((response) => response.data.deleteShed)
            )
    }
}
