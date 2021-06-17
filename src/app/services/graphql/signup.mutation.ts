import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { UserInput, User } from '../../../api/graphql';


interface Response {
    signup: User
}

interface Params {
    user: UserInput
}

@Injectable({
    providedIn: 'root'
})
export class SignUpMutation extends Mutation<Response, Params> {
    document = gql`
        mutation signup($user: UserInput!) {
            signup(user: $user) {
                _id
                names
                firstName
                lastName
                email
            }
        }
    `
}
