import {Injectable} from '@angular/core';
import {AddPoolMutation} from './graphql/add-pool.mutation';
import {Pool, PoolInput, PoolUpdate} from '../../../../api/graphql';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UpdatePoolMutation} from './graphql/update-pool.mutation';
import {ActivatePoolMutation} from './graphql/activate-pool.mutation';
import {DeactivatePoolMutation} from './graphql/deactivate-pool.mutation';
import {RemovePoolMutation} from './graphql/remove-pool.mutation';


@Injectable({
    providedIn: 'root'
})
export class PoolsService {

    constructor(private addPoolMutation: AddPoolMutation,
                private updatePoolMutation: UpdatePoolMutation,
                private deactivatePoolMutation: DeactivatePoolMutation,
                private removePoolMutation: RemovePoolMutation,
                private activatePoolMutation: ActivatePoolMutation) {
    }

    addPool(pool: PoolInput): Observable<Pool> {
        return this.addPoolMutation.mutate({ pool })
            .pipe(
                map((response) => response.data.addPool)
            )
    }

    updatePool(idPool: string, update: PoolUpdate): Observable<Pool> {
        return this.updatePoolMutation.mutate({ idPool, update })
            .pipe(
                map((response) => response.data.updatePool)
            )
    }

    updatePoolStatus(idPool: string, newStatus: boolean): Observable<boolean> {
        if (newStatus) {
            return this.activatePoolMutation.mutate({ idPool })
                .pipe(
                    map((response) => response.data.activatePool)
                )
        } else {
            return this.deactivatePoolMutation.mutate({ idPool })
                .pipe(
                    map((response) => response.data.deactivatePool)
                )
        }
    }

    removePool(idPool: string): Observable<boolean> {
        return this.removePoolMutation.mutate({ idPool: idPool })
            .pipe(
                map((response) => response.data.deletePool)
            )
    }
}
