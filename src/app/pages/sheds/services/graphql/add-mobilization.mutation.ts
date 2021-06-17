import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';
import {Mobilization, MobilizationInput} from '../../../../../api/graphql';

interface Response {
    addMobilization: Mobilization
}

interface Params {
    mobilization: MobilizationInput
}

@Injectable({
    providedIn: 'root'
})
export class AddMobilizationMutation extends Mutation<Response, Params> {
    document = gql`
        mutation addMobilization($mobilization: MobilizationInput!) {
            addMobilization(mobilization: $mobilization) {
                _id
            }
        }
    `
}
