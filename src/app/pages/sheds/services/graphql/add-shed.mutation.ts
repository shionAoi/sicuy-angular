import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';
import {Shed, ShedInput} from '../../../../../api/graphql';


interface Response {
    addShed: Shed
}

interface Params {
    shed: ShedInput
}

@Injectable({
    providedIn: 'root'
})
export class AddShedMutation extends Mutation<Response, Params> {
    document = gql`
        mutation addShed($shed: ShedInput!) {
            addShed(shed: $shed) {
                _id
                name
            }
        }
    `
}
