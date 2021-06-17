import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';
import {AuthData} from '../../../api/graphql';


interface Response {
    login: AuthData
}

interface Params {
    email: string,
    password: string
}

@Injectable({
    providedIn: 'root'
})
export class LoginMutation extends Mutation<Response, Params> {
    document = gql`
        mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                user {
                    _id
                    names
                    firstName
                    lastName
                    dni
                    email
                    phone
                    roles {
                        _id
                        name
                        operations{
                            _id
                            name
                        }
                        description
                    }
                    accessLifeCycle{
                        active
                        inactive
                    }
                }
                token
                tokenExpiration
                token_refresh
            }
        }
    `
}
