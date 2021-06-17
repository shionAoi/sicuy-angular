import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {ShedPagination} from '../../../../../api/graphql';

interface Response {
    sheds: ShedPagination
}

interface Params {
    skip: number,
    limit: number,
    filter: boolean
}

@Injectable({
    providedIn: 'root'
})
export class GetShedsQuery extends Query<Response, Params> {
    document = gql`
        query($skip: Int!, $limit: Int!, $filter: Boolean!) {
            sheds(skip: $skip, limit: $limit, filter: $filter) {
                shedList {
                    _id
                    name
                    code
                    active
                    details
                    male_number_cuys
                    female_number_cuys
                    children_number_cuys
                    total_number_cuys
                    pools(
                        filter: $filter
                    ){
                        totalNumPools
                    }
                }
                totalNumSheds
            }
        }
    `
}
