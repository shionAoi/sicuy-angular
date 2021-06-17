import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

interface Response {
    activateCuy: boolean
}

interface Params {
    idCuy: string
}

@Injectable({
    providedIn: 'root'
})
export class ActivateCuyMutation extends Mutation<Response, Params> {
    document = gql`
        mutation activateCuy($idCuy: ID!) {
            activateCuy(idCuy: $idCuy)
        }
    `
}
