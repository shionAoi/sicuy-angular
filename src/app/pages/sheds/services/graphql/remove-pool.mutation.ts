import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

interface Response {
    deletePool: boolean
}

interface Params {
    idPool: string
}

@Injectable({
    providedIn: 'root'
})
export class RemovePoolMutation extends Mutation<Response, Params> {
    document = gql`
        mutation deletePool($idPool: ID!) {
            deletePool(idPool: $idPool)
        }
    `
}
