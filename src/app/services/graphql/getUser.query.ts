import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {User} from '../../../api/graphql';

interface Response {
    userById: User
}

interface Params {
    id: string
}

@Injectable({
    providedIn: 'root'
})
export class GetUserById extends Query<Response, Params> {
    document = gql`
        query($id: ID!) {
            userById(id: $id) {
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
        }
    `
}