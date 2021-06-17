import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';
import {DeathInput} from '../../../../../api/graphql';

interface Response {
    registerDeathCuy: boolean
}

interface Params {
    idCuy: string
    death: DeathInput
}

@Injectable({
    providedIn: 'root'
})
export class AddCuyDeathMutation extends Mutation<Response, Params> {
    document = gql`
        mutation registerDeathCuy($idCuy: ID!, $death: DeathInput!) {
            registerDeathCuy(idCuy: $idCuy, death: $death)
        }
    `
}
