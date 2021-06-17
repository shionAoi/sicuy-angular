import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';
import {DeathInput, SacaInput} from '../../../../../api/graphql';

interface Response {
    registerSacaCuy: boolean
}

interface Params {
    idCuy: string
    saca: SacaInput
}

@Injectable({
    providedIn: 'root'
})
export class RegisterCuySacaQuery extends Mutation<Response, Params> {
    document = gql`
        mutation registerSacaCuy($idCuy: ID!, $saca: SacaInput!) {
            registerSacaCuy(idCuy: $idCuy, saca: $saca)
        }
    `
}
