import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

interface Response {
    deleteShed: boolean
}

interface Params {
    idShed: string
}

@Injectable({
    providedIn: 'root'
})
export class RemoveShedMutation extends Mutation<Response, Params> {
    document = gql`
        mutation deleteShed($idShed: ID!) {
            deleteShed(idShed: $idShed)
        }
    `
}
