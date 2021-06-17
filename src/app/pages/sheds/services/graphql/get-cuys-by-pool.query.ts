import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {CuyPaginationPool, Pool} from '../../../../../api/graphql';

interface Response {
    getAllCuysOfPool: CuyPaginationPool
    getPoolByID: Pool
}

interface Params {
    idPool: string,
    filter: boolean,
    skip: number,
    limit: number
}

@Injectable({
    providedIn: 'root'
})
export class GetCuysByPoolQuery extends Query<Response, Params> {
    document = gql`
        query($idPool: ID!, $filter: Boolean!, $skip: Int!, $limit: Int!) {
            getAllCuysOfPool(
                idPool: $idPool
                filter: $filter
                skip: $skip
                limit: $limit
            ) {
                cuyList {
                    _id
                    earring
                    race
                    genre
                    color
                    current_weight
                    description
                    birthday_date
                    active
                    observation
                    current_weight
                    current_photo
                    death{
                        date
                        reason
                        reference_doc
                    }
                    saca{
                        reason
                        reference_doc
                        created_date
                        updated_date
                        date
                    }
                }
                totalNumCuys
            }
            getPoolByID(idPool: $idPool) {
                _id
                code
            }
        }
    `
}
