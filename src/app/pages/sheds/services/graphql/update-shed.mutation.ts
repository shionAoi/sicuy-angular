import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';
import {Shed, ShedUpdate} from '../../../../../api/graphql';

interface Response {
    updateShed: Shed
}

interface Params {
    idShed: String
    shed: ShedUpdate
}

@Injectable({
    providedIn: 'root'
})
export class UpdateShedMutation extends Mutation<Response, Params> {
    document = gql`
        mutation updateShed($idShed: ID!, $shed: ShedUpdate!) {
            updateShed(idShed: $idShed, update: $shed) {
                _id
                name
            }
        }
    `
}
