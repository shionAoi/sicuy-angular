import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

interface Response {
    deleteCuy: boolean
}

interface Params {
    idCuy: string
}

@Injectable({
    providedIn: 'root'
})
export class RemoveCuyMutation extends Mutation<Response, Params> {
    document = gql`
        mutation deleteCuy($idCuy: ID!) {
            deleteCuy(idCuy: $idCuy)
        }
    `
}
