import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';
import {Pool, PoolUpdate} from '../../../../../api/graphql';

interface Response {
    updatePool: Pool
}

interface Params {
    idPool: string
    update: PoolUpdate
}

@Injectable({
    providedIn: 'root'
})
export class UpdatePoolMutation extends Mutation<Response, Params> {
    document = gql`
        mutation updatePool($idPool: ID!, $update: PoolUpdate!) {
            updatePool(idPool: $idPool, update: $update) {
                _id
                type
            }
        }
    `
}
