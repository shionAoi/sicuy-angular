import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {Pools} from '../../../../../api/graphql';

interface Response {
    pools: Pools
}

interface Params {
    filter: boolean
}

@Injectable({
    providedIn: 'root'
})
export class GetPoolsQuery extends Query<Response, Params> {
    document = gql`
        query($filter: Boolean!) {
            pools(filter: $filter) {
                totalNumPools
            }
        }
    `
}