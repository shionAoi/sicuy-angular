import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {Cuys} from '../../../../../api/graphql';

interface Response {
    cuys: Cuys
}

interface Params {
    filter: boolean
}

@Injectable({
    providedIn: 'root'
})
export class GetCuysQuery extends Query<Response, Params> {
    document = gql`
        query($filter: Boolean!) {
            cuys(filter: $filter) {
                totalNumCuys
            }
        }
    `
}