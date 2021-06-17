import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {flatMap} from 'rxjs/internal/operators';
import {GetShedAndPoolByIdQuery} from './graphql/get-shed-and-pool-by-id.query';
import {GetShedsAndPoolsQuery} from './graphql/get-sheds-and-pools.query';
import {Mobilization, MobilizationInput, Shed, ShedPagination} from '../../../../api/graphql';
import {AddMobilizationMutation} from './graphql/add-mobilization.mutation';
import {UploadService} from '../../../services/upload.service';


@Injectable({
    providedIn: 'root'
})
export class MobilizeCuyService {

    constructor(private getShedAndPoolByIdQuery: GetShedAndPoolByIdQuery,
                private getShedsAndPoolsQuery: GetShedsAndPoolsQuery,
                private uploadService: UploadService,
                private addMobilizationMutation: AddMobilizationMutation) {
    }

    getShedAndPoolById(idShed: string, idPool: string): Observable<any> {
        return this.getShedAndPoolByIdQuery.fetch({ idShed, idPool }, { fetchPolicy: 'network-only' })
            .pipe(
                map((res) => res.data)
            )
    }

    getShedsAndPools(): Observable<ShedPagination> {
        return this.getShedsAndPoolsQuery.fetch({ filter: true }, { fetchPolicy: 'network-only' })
            .pipe(
                map((res) => res.data.sheds)
            )
    }

    mobilizeCuy(file: File, mobilization: MobilizationInput): Observable<Observable<Mobilization>> {
        return this.uploadService.uploadFile(file, mobilization.cuy)
            .pipe(
                map(
                    ({ path }: any) => {
                        const newMobi: MobilizationInput = { ...mobilization, reference_doc: path }
                        return this.addMobilizationMutation.mutate({ mobilization: newMobi })
                            .pipe(
                                map((res) => res.data.addMobilization)
                            )
                    }
                )
            )
    }
}

