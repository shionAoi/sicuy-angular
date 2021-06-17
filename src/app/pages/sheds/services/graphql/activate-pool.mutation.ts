import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

interface Response {
    activatePool: boolean
}

interface Params {
    idPool: string
}

@Injectable({
    providedIn: 'root'
})
export class ActivatePoolMutation extends Mutation<Response, Params> {
    document = gql`
        mutation activatePool($idPool: ID!) {
            activatePool(idPool: $idPool)
        }
    `
}
