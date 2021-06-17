import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

interface Response {
    deactivateShed: boolean
}

interface Params {
    idShed: string
}

@Injectable({
    providedIn: 'root'
})
export class DeactivateShedMutation extends Mutation<Response, Params> {
    document = gql`
        mutation deactivateShed($idShed: ID!) {
            deactivateShed(idShed: $idShed)
        }
    `
}
