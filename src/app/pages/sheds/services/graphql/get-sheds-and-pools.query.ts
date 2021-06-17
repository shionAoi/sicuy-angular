import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {Shed, ShedPagination} from '../../../../../api/graphql';

interface Response {
    sheds: ShedPagination
}

interface Params {
    filter: boolean
}

@Injectable({
    providedIn: 'root'
})
export class GetShedsAndPoolsQuery extends Query<Response, Params> {
    document = gql`
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
}
