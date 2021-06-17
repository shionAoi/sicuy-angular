import {
  Injectable
} from '@angular/core';
import {
  Access,
  Role
} from 'api/graphql';
import {
  Apollo,
  gql
} from 'apollo-angular';
import {
  User
} from './models/user';
import {
  map
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) {}

  getUserInfo() {
    const query_userInfo = gql `
            query UserInfo{
                userInfo{
                    _id
                    names
                    firstName
                    lastName
                    dni
                    photo
                    email
                    phone
                    roles {
                        _id
                        name
                        description
                    }
                    accessLifeCycle{
                        active
                        inactive
                    }
                }
            }`;
    return this.apollo.query({
      query: query_userInfo
    });
  }

  updateUser(user: User) {
    const mutation_updateUser = gql `
            mutation UpdateUser( $id: ID!, $names: String, $firstName: String, $lastName: String, $dni: String, $phone: String){
                updateUser(idUser: $id, user: {
                    names: $names
                    firstName: $firstName
                    lastName: $lastName
                    dni: $dni
                    phone: $phone
                }) {
                    _id
                    names
                    firstName
                    lastName
                    dni
                    photo
                    email
                    phone
                    roles {
                        _id
                        name
                        description
                    }
                    accessLifeCycle{
                        active
                        inactive
                    }
                }
            }
        `;
    return this.apollo.mutate({
      mutation: mutation_updateUser,
      variables: {
        id: user._id,
        names: user.names,
        firstName: user.firstName,
        lastName: user.lastName,
        dni: user.dni,
        phone: user.phone
      }
    })
  }

  users() {
    const query_users = gql `
            query {
                users {
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
                    }
                }
            }`;
    return this.apollo.query({
      query: query_users
    });
  }

  getUserById(id: string) {
    const query_getUserById = gql `
            query UserById($id: ID!){
                userById (id: $id) {
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
                        description
                    }
                    accessLifeCycle {
                        active
                        inactive
                    }
                }
            }`;
    return this.apollo.query({
      query: query_getUserById,
      variables: {
        id: id
      }
    });
  }

  updateAccess(id: string, access: Access) {
    const mutation_updateAccess = gql `
            mutation UpdateAccess($idUser: ID!, $active: Boolean, $inactive: Boolean){
                updateAccessOfUser(
                    idUser: $idUser
                    access: {
                        active: $active
                        inactive: $inactive
                    }
                )
            }`;
    return this.apollo.mutate({
      mutation: mutation_updateAccess,
      variables: {
        idUser: id,
        active: access.active,
        inactive: access.inactive
      }
    });
  }

  birth_rate(id: string) {
    const query_getCuys = gql `
            query getShedById($idShed: ID!) {
                getShedByID (idShed: $idShed) {
                    _id
                    name
                    code
                    male_number_cuys
                    female_number_cuys
                    children_number_cuys
                    total_number_cuys
                    pools (filter: true){
                        poolList{
                            cuys (filter: true) {
                                cuyList {
                                    birthday_date
                                }
                            }
                        }
                    }
                }
            }`;
    return this.apollo.query({
      query: query_getCuys,
      variables: {
        idShed: id
      }
    });
  }

  deathRate(id: string) {
    const query_getDeathRate = gql`
    query getDeathRate($idShed: ID!) {
      getShedByID(idShed: $idShed) {
        pools(filter: true) {
          poolList {
            cuys(filter: false) {
              cuyList {
                death {
                  date
                }
              }
            }
          }
        }
      }
    }
    `;
    return this.apollo.query({ query: query_getDeathRate, variables: {
      idShed: id
    }});
  }

  pullsOutRate(id: string) {
    const query_getDeathRate = gql`
    query getSacaRate($idShed: ID!) {
      getShedByID(idShed: $idShed) {
        pools(filter: true) {
          poolList {
            cuys(filter: false) {
              cuyList {
                saca {
                  date
                }
              }
            }
          }
        }
      }
    }
    `;
    return this.apollo.query({ query: query_getDeathRate, variables: {
      idShed: id
    }});
  }

  deleteUser(id: string) {
    const mutation_deleteUser = gql `
            mutation DeleteUser($id: ID!) {
                deleteUser(idUser: $id)
            }`;
    return this.apollo.mutate({
      mutation: mutation_deleteUser,
      variables: {
        id: id
      }
    });
  }

  operations() {
    const query_operations = gql `
    query {
      operations {
        _id
        name
        description
        type
      }
    }`;
    return this.apollo.query({
      query: query_operations
    });
  }

  addRol(rol: Role) {
    const mutation_addRole = gql `
    mutation AddRol($name: String!, $description: String!) {
      addRole( role: {
        name: $name
        description: $description
      }) {
        _id
        name
        description
      }
    }`;
    return this.apollo.mutate({
      mutation: mutation_addRole,
      variables: {
        name: rol.name,
        description: rol.description
      }
    });
  }

  updateRol(rol: Role) {
    const mutation_updateRole = gql `
    mutation UpdateRol($idRole: ID!, $name: String!, $description: String!) {
      updateRole( 
        idRole: $idRole
        role: {
        name: $name
        description: $description
      }) {
        _id
        name
        description
      }
    }`;
    return this.apollo.mutate({
      mutation: mutation_updateRole,
      variables: {
        idRole: rol._id,
        name: rol.name,
        description: rol.description
      }
    })
  }

  deleteRol(id: string) {
    const mutation_deleteRole = gql `
    mutation DeleteRol($id: ID!){
      deleteRole(idRole: $id)
    }`;
    return this.apollo.mutate({
      mutation: mutation_deleteRole,
      variables: {
        id: id
      }
    });
  }

  addRoleToUser(idUser: string, idRol: string) {
    const mutation_AddRoleToUser = gql `
    mutation AddRoleToUser($idUser: ID!, $idRole: ID!){
      addRoleToUser(idUser: $idUser
      idRole: $idRole)
    }`;
    return this.apollo.mutate({
      mutation: mutation_AddRoleToUser,
      variables: {
        idUser: idUser,
        idRole: idRol
      }
    });
  }

  deleteRoleToUser(idUser: string, idRol: string) {
    const mutation_DeleteRoleToUser = gql `
    mutation DeleteRoleToUser($idUser: ID!, $idRole: ID!){
      deleteRoleOfUser(idUser: $idUser
      idRole: $idRole)
    }`;
    return this.apollo.mutate({
      mutation: mutation_DeleteRoleToUser,
      variables: {
        idUser: idUser,
        idRole: idRol
      }
    })
  }
  roles() {
    const query_roles = gql `
            query {
                roles{
                    _id
                    name
                    description
                    operations {
                        _id
                        name
                        description
                        type
                    }
                }
            }`;
    return this.apollo.query({
      query: query_roles
    });
  }

  sheds(){
      const query_getSheds = gql`
      query {
        sheds (filter: true){
          shedList {
            _id
            name
          }
        }
      }`;
      return this.apollo.query({query: query_getSheds});
  }

}
