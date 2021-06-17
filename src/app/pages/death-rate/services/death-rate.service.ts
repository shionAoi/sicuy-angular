import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CuyReportPagination, ShedPagination} from '../../../../api/graphql';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';

const GET_CUY_LIST = gql`
    query cuysList(
        $idShed: ID,
        $idPool: ID,
        $dateFrom: DateTime,
        $dateTo: DateTime,
        $reason: String,
        $skip: Int,
        $limit: Int,
    ) {
        getDeathCuysReport(
            idShed: $idShed,
            idPool: $idPool,
            dateFrom: $dateFrom,
            dateTo: $dateTo,
            reason: $reason,
            skip: $skip,
            limit: $limit) {
            cuyList {
                _id
                earring
                race
                genre
                current_photo
                current_weight
                birthday_date
                shed_code
                shed_name
                pool_code
                pool_phase
                death{
                    certified_by{
                        _id
                        names
                        firstName
                        lastName
                    }
                    reference_doc
                    date
                    reason
                }
            }
            totalNumCuys
        }
    }
`

const GET_SHEDS_AND_POOLS = gql`
    query sheds($filter: Boolean!) {
        sheds(filter: $filter) {
            shedList {
                _id
                name
                pools(filter: $filter) {
                    poolList {
                        _id
                        code
                    }
                }
            }
        }
    }
`

@Injectable({
    providedIn: 'root'
})
export class DeathRateService {

    constructor(private apollo: Apollo) {
    }

    getCuyList(
        idShed?: string,
        idPool?: string,
        dateFrom?: string,
        dateTo?: string,
        reason?: string,
        skip?: number,
        limit?: number
    ): Observable<CuyReportPagination> {
        return this.apollo.query<any>({
            query: GET_CUY_LIST,
            variables: {
                idShed,
                idPool,
                dateFrom,
                dateTo,
                reason,
                skip,
                limit
            }
        }).pipe(
            map((response) => {
                return response.data.getDeathCuysReport
            })
        )
    }

    getShedsAndPools(filter: boolean): Observable<ShedPagination> {
        return this.apollo.query<any>(
            {
                query: GET_SHEDS_AND_POOLS,
                variables: {
                    filter
                }
            }
        ).pipe(
            map((res) => res.data.sheds)
        )
    }
}

