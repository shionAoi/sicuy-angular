import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';
import {Pool, PoolInput} from '../../../../../api/graphql';

interface Response {
    addPool: Pool
}

interface Params {
    pool: PoolInput
}

@Injectable({
    providedIn: 'root'
})
export class AddPoolMutation extends Mutation<Response, Params> {
    document = gql`
        mutation addPool($pool: PoolInput!) {
            addPool(pool: $pool) {
                _id
                code
            }
        }
    `
}
