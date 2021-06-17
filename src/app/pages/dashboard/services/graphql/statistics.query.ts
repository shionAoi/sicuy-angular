import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { ShedsStatistics } from '../../../../../api/graphql';

interface Response{
    getShedsStatistics: ShedsStatistics[]
}

@Injectable({
    providedIn: 'root'
})
export class GetStatistics extends Query<Response> {
    document = gql`
        query getShedsStatistics {
            getShedsStatistics  {
                _id
                name
                details
                code
                alive_cuys
                saca_cuys
                dead_cuys
            }
        }
    `
}