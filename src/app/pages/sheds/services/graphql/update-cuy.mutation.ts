import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';
import {Cuy, CuyUpdate} from '../../../../../api/graphql';

interface Response {
    updateCuy: Cuy
}

interface Params {
    idCuy: string
    update: CuyUpdate
}

@Injectable({
    providedIn: 'root'
})
export class UpdateCuyMutation extends Mutation<Response, Params> {
    document = gql`
        mutation updateCuy($idCuy: ID!, $update: CuyUpdate!) {
            updateCuy(idCuy: $idCuy, update: $update) {
                _id
                earring
            }
        }
    `
}
