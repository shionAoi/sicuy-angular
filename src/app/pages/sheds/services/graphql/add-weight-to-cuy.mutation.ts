import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';
import {WeightInput} from '../../../../../api/graphql';

interface Response {
    addWeightToCuy: boolean
}

interface Params {
    idCuy: string
    weight: WeightInput
}

@Injectable({
    providedIn: 'root'
})
export class AddWeightToCuyMutation extends Mutation<Response, Params> {
    document = gql`
        mutation addWeightToCuy($idCuy: ID!, $weight: WeightInput!) {
            addWeightToCuy(idCuy: $idCuy, weight: $weight)
        }
    `
}
