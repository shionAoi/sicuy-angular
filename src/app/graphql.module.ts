import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {setContext} from '@apollo/client/link/context';
import {SessionService} from './services/session.service';
import {environment} from '../environments/environment';
import {onError} from '@apollo/client/link/error';

export function createApollo(httpLink: HttpLink, sessionService: SessionService): ApolloClientOptions<any> {

    const auth = setContext((operation, prevContext) => {
        return {
            headers: {
                authorization: sessionService.getToken()
            }
        }
    })

    const error = onError(({ graphQLErrors, networkError, operation, forward }) => {
        // if (graphQLErrors) {
        //     graphQLErrors.forEach((err) => {
        //         console.log(`[GraphQL error]: Message: ${ err.message }, Location: ${ err.locations }, Path: ${ err.path }`)
        //     })
        // }
        // if (networkError) {
        //     console.log(`[Network error]: ${ networkError.message }`)
        // }
        // forward(operation).map((data) => {
        //     console.log(``)
        //     return data
        // })
    })

    return {
        link: ApolloLink.from([auth, error, httpLink.create({ uri: environment.API_ENDPOINT })]),
        cache: new InMemoryCache()
    }
}

@NgModule({
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink, SessionService],
        },
    ],
})
export class GraphQLModule {

    constructor() {
    }
}
