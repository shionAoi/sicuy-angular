import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {ShedPagination} from '../../../../../api/graphql';

interface Response {
    sheds: ShedPagination
}

interface Params {
    filter: boolean
}

@Injectable({
    providedIn: 'root'
})
export class GetShedsQuery extends Query<Response, Params> {
    document = gql`
        query($filter: Boolean!) {
            sheds(filter: $filter) {
                totalNumSheds
            }
        }
    `
}