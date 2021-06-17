import { Injectable } from '@angular/core';
import { Cuys, Pools, ShedPagination, ShedsStatistics } from 'api/graphql';
import { GetShedsQuery } from './graphql/sheds.query';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GetPoolsQuery } from './graphql/pools.query';
import { GetCuysQuery } from './graphql/cuys.query';
import { GetStatistics } from './graphql/statistics.query';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private getShedsQuery: GetShedsQuery,
    private getPoolsQuery: GetPoolsQuery,
    private getCuysQuery: GetCuysQuery,
    private getStatistics: GetStatistics
  ) { }

  getShedsFilter(filter: boolean): Observable<ShedPagination> {
    return this.getShedsQuery.fetch({ filter }, { fetchPolicy: 'network-only' })
      .pipe(
        map((response) => response.data.sheds)
      )
  }

  getPoolsFilter(filter: boolean): Observable<Pools> {
    return this.getPoolsQuery.fetch({ filter }, { fetchPolicy: 'network-only' })
      .pipe(
        map((response) => response.data.pools)
      )
  }

  getCuysFilter(filter: boolean): Observable<Cuys> {
    return this.getCuysQuery.fetch({ filter }, { fetchPolicy: 'network-only' })
      .pipe(
        map((response) => response.data.cuys)
      )
  }

  getStatisticsTable():Observable<ShedsStatistics[]> {
    return this.getStatistics.fetch({}, { fetchPolicy: 'network-only' })
    .pipe(
      map((response) => response.data.getShedsStatistics)
    )
  }

}
