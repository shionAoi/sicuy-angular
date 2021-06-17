import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

interface Response {
    deactivateCuy: boolean
}

interface Params {
    idCuy: string
}

@Injectable({
    providedIn: 'root'
})
export class DeactivateCuyMutation extends Mutation<Response, Params> {
    document = gql`
        mutation deactivateCuy($idCuy: ID!) {
            deactivateCuy(idCuy: $idCuy)
        }
    `
}
