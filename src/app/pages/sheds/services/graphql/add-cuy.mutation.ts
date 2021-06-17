import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';
import {Cuy, CuyInput} from '../../../../../api/graphql';

interface Response {
    addCuy: Cuy
}

interface Params {
    cuy: CuyInput
}

@Injectable({
    providedIn: 'root'
})
export class AddCuyMutation extends Mutation<Response, Params> {
    document = gql`
        mutation($cuy: CuyInput!) {
            addCuy(cuy: $cuy) {
                _id
                earring
                race
                genre
                current_photo
                color
                description
                observation
                birthday_date
                active
                current_weight
            }
        }
    `
}
