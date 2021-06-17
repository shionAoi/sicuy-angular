import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../../api/graphql';
import { GetUserById } from './graphql/getUser.query';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private getUser: GetUserById
  ) { }

  getUserById(id: string): Observable<User> {
    return this.getUser.fetch({ id }, { fetchPolicy: 'network-only' })
      .pipe(
        map((res) => res.data.userById)
      )
  }
}
