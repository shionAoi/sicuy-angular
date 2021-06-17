import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {PoolPaginationShed, Shed} from '../../../../../api/graphql';

interface Response {
    getPoolsByShed: PoolPaginationShed
    getShedByID: Shed
}

interface Params {
    idShed: string,
    skip: number,
    limit: number,
    filter: boolean
}

@Injectable({
    providedIn: 'root'
})
export class GetPoolsByShedQuery extends Query<Response, Params> {
    document = gql`
        query getPoolsByShed(
            $idShed: ID!
            $skip: Int!
            $limit: Int!
            $filter: Boolean!
        ) {
            getPoolsByShed(idShed: $idShed, skip: $skip, limit: $limit, filter: $filter) {
                poolList {
                    _id
                    code
                    type
                    active
                    phase
                    description
                    total_population
                    population {
                        genre
                        quantity
                    }
                }
                totalNumPools
            }
            getShedByID(idShed: $idShed) {
                name
            }
        }
    `
}
