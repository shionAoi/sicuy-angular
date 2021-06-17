import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {Pool} from '../../../../../api/graphql';

interface Response {
    getPoolByID: Pool
}

interface Params {
    idPool: string
}

@Injectable({
    providedIn: 'root'
})
export class GetPoolByIdQuery extends Query<Response, Params> {
    document = gql`
        query getPoolByID($idPool: ID!){
            getPoolByID(idPool: $idPool) {
                _id
                code
            }
        }
    `
}
