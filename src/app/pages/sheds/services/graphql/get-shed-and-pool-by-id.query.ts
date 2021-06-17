import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {Pool, Shed} from '../../../../../api/graphql';

interface Response {
    getShedByID: Shed
    getPoolByID: Pool
}

interface Params {
    idShed: string
    idPool: string
}

@Injectable({
    providedIn: 'root'
})
export class GetShedAndPoolByIdQuery extends Query<Response, Params> {
    document = gql`
        query getShedAndPoolById($idShed: ID!, $idPool: ID!) {
            getShedByID(idShed: $idShed) {
                _id
                name
            }
            getPoolByID(idPool: $idPool) {
                _id
                type
                code
            }
        }
    `
}
