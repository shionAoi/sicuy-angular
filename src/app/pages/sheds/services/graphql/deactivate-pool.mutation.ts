import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

interface Response {
    deactivatePool: boolean
}

interface Params {
    idPool: string
}

@Injectable({
    providedIn: 'root'
})
export class DeactivatePoolMutation extends Mutation<Response, Params> {
    document = gql`
        mutation deactivatePool($idPool: ID!) {
            deactivatePool(idPool: $idPool)
        }
    `
}
