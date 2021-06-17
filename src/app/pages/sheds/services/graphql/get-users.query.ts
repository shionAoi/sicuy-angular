import {Injectable} from '@angular/core';
import {Mutation, Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {User} from '../../../../../api/graphql';

interface Response {
    users: User[]
}

@Injectable({
    providedIn: 'root'
})
export class GetUsersQuery extends Query<Response> {
    document = gql`
        query users {
            users {
                _id
                names
                firstName
                lastName
            }
        }
    `
}
