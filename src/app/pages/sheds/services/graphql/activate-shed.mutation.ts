import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

interface Response {
    activateShed: boolean
}

interface Params {
    idShed: string
}

@Injectable({
    providedIn: 'root'
})
export class ActivateShedMutation extends Mutation<Response, Params> {
    document = gql`
        mutation activateShed($idShed: ID!) {
            activateShed(idShed: $idShed)
        }
    `
}
