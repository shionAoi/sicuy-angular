import { gql } from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A DateTime representation in ISO format */
  DateTime: any;
};



export type Access = {
  __typename?: 'Access';
  active?: Maybe<Scalars['Boolean']>;
  inactive?: Maybe<Scalars['Boolean']>;
};

export type AuthData = {
  __typename?: 'AuthData';
  token: Scalars['String'];
  tokenExpiration: Scalars['String'];
  token_refresh: Scalars['String'];
  user?: Maybe<User>;
};

/** Cuy type */
export type Cuy = {
  __typename?: 'Cuy';
  /** ID of cuy */
  _id?: Maybe<Scalars['ID']>;
  /** Active or Inactive cuy */
  active?: Maybe<Scalars['Boolean']>;
  /** Birthday of cuy */
  birthday_date?: Maybe<Scalars['DateTime']>;
  /** Color of cuy */
  color?: Maybe<Scalars['String']>;
  /** Date of creation in database */
  created_date?: Maybe<Scalars['DateTime']>;
  /** Photo of the last weight measurement */
  current_photo?: Maybe<Scalars['String']>;
  /** Last weight measurement */
  current_weight?: Maybe<Scalars['Float']>;
  /** Death of cuy */
  death?: Maybe<Death>;
  /** Description of cuy */
  description?: Maybe<Scalars['String']>;
  /** Earring of cuy */
  earring?: Maybe<Scalars['String']>;
  /** Genre of cuy */
  genre?: Maybe<Scalars['String']>;
  /** Observation of cuy */
  observation?: Maybe<Scalars['String']>;
  /** Race of cuy */
  race?: Maybe<Scalars['String']>;
  /** Saca of cuy */
  saca?: Maybe<Saca>;
  /** Last date of update in database */
  updated_date?: Maybe<Scalars['DateTime']>;
  /** All weight measurements */
  weights?: Maybe<Array<Maybe<Weight>>>;
};

export type CuyPagination = {
  __typename?: 'CuyPagination';
  cuyList?: Maybe<Array<Maybe<Cuy>>>;
  totalNumCuys?: Maybe<Scalars['Int']>;
};

export type CuyPaginationPool = {
  __typename?: 'CuyPaginationPool';
  cuyList?: Maybe<Array<Maybe<Cuy>>>;
  totalNumCuys?: Maybe<Scalars['Int']>;
};

export type CuyReport = {
  __typename?: 'CuyReport';
  _id?: Maybe<Scalars['ID']>;
  birthday_date?: Maybe<Scalars['DateTime']>;
  current_photo?: Maybe<Scalars['String']>;
  current_weight?: Maybe<Scalars['Float']>;
  death?: Maybe<Death>;
  earring?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
  pool_code?: Maybe<Scalars['String']>;
  pool_phase?: Maybe<Scalars['String']>;
  race?: Maybe<Scalars['String']>;
  saca?: Maybe<Saca>;
  shed_code?: Maybe<Scalars['String']>;
  shed_name?: Maybe<Scalars['String']>;
};

export type CuyReportPagination = {
  __typename?: 'CuyReportPagination';
  /** List of all cuys */
  cuyList?: Maybe<Array<Maybe<CuyReport>>>;
  /** Total number of cuys */
  totalNumCuys?: Maybe<Scalars['Int']>;
};

export type Cuys = {
  __typename?: 'Cuys';
  cuyList?: Maybe<Array<Maybe<Cuy>>>;
  totalNumCuys?: Maybe<Scalars['Int']>;
};

export type Death = {
  __typename?: 'Death';
  certified_by?: Maybe<UserReports>;
  date?: Maybe<Scalars['DateTime']>;
  reason?: Maybe<Scalars['String']>;
  reference_doc?: Maybe<Scalars['String']>;
  user?: Maybe<UserReports>;
};

/** Mobilization type */
export type Mobilization = {
  __typename?: 'Mobilization';
  /** ID of mobilization */
  _id?: Maybe<Scalars['ID']>;
  /** date of creation */
  created_date?: Maybe<Scalars['DateTime']>;
  /** cuy mobilized */
  cuy?: Maybe<Cuy>;
  /** Date when cuy was mobilized */
  date?: Maybe<Scalars['DateTime']>;
  /** Pool of destine */
  destination?: Maybe<Pool>;
  /** Pool of origin */
  origin?: Maybe<Pool>;
  /** Reason for mobilization */
  reason?: Maybe<Scalars['String']>;
  /** Url of document that proves the mobilization */
  reference_doc?: Maybe<Scalars['String']>;
  /** last date of update in document */
  updated_date?: Maybe<Scalars['DateTime']>;
  /** user that made mobilization */
  user?: Maybe<UserReports>;
};

/** MobilizationPagination type */
export type MobilizationPagination = {
  __typename?: 'MobilizationPagination';
  /** List of all mobilizations */
  mobilList?: Maybe<Array<Maybe<Mobilization>>>;
  /** total number of mobilizations */
  totalNumMobil?: Maybe<Scalars['Int']>;
};

/** MobilizationReport type */
export type MobilizationReport = {
  __typename?: 'MobilizationReport';
  /** ID of mobilization */
  _id?: Maybe<Scalars['ID']>;
  /** Date of creation of mobilization */
  created_date?: Maybe<Scalars['DateTime']>;
  /** State of cuy active or inactive */
  cuy_active?: Maybe<Scalars['Boolean']>;
  /** Death object of cuy */
  cuy_death?: Maybe<Death>;
  /** Earring of cuy */
  cuy_earring?: Maybe<Scalars['String']>;
  /** Genre of cuy */
  cuy_genre?: Maybe<Scalars['String']>;
  /** Race of cuy */
  cuy_race?: Maybe<Scalars['String']>;
  /** Saca object of cuy */
  cuy_saca?: Maybe<Saca>;
  /** Date of mobilization */
  date?: Maybe<Scalars['DateTime']>;
  /** Code of destination pool of mobilization */
  destination_code?: Maybe<Scalars['String']>;
  /** Phase of destination pool of mobilization */
  destination_phase?: Maybe<Scalars['String']>;
  /** Code of origin pool of mobilization */
  origin_code?: Maybe<Scalars['String']>;
  /** Phase of origin pool of mobilization */
  origin_phase?: Maybe<Scalars['String']>;
  /** Reason of mobilization */
  reason?: Maybe<Scalars['String']>;
  /** Reference path document of mobilization */
  reference_doc?: Maybe<Scalars['String']>;
  /** Date of update of mobilization */
  updated_date?: Maybe<Scalars['DateTime']>;
  /** User of mobilization */
  user?: Maybe<UserReports>;
};

/** MobilizationReportPagination type */
export type MobilizationReportPagination = {
  __typename?: 'MobilizationReportPagination';
  /** List of all mobilizations */
  mobilizationList?: Maybe<Array<Maybe<MobilizationReport>>>;
  /** total number of mobilizations */
  totalNumMobilizations?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** activateCuy mutation activates a cuy by its ID */
  activateCuy?: Maybe<Scalars['Boolean']>;
  /** activatePool Mutation activates a pool by its ID */
  activatePool?: Maybe<Scalars['Boolean']>;
  /** activateShed Mutation activates shed by its ID */
  activateShed?: Maybe<Scalars['Boolean']>;
  /** addCuy mutation adds a cuy */
  addCuy?: Maybe<Cuy>;
  /** addMobilization mutation adds a mobilization */
  addMobilization?: Maybe<Mobilization>;
  /** addOperationToRole mutation adds a operation to role */
  addOperationToRole?: Maybe<Scalars['Boolean']>;
  /** addPool Mutation adds a pool */
  addPool?: Maybe<Pool>;
  /** addRole mutation adds a role */
  addRole?: Maybe<Role>;
  /** addRoleToUser mutation to add role to a user */
  addRoleToUser?: Maybe<Scalars['Boolean']>;
  /** addShed Mutation adds a shed */
  addShed?: Maybe<Shed>;
  /** addWeightToCuy mutation adds weight to cuy */
  addWeightToCuy?: Maybe<Scalars['Boolean']>;
  /** deactivateCuy mutation deactivates a cuy by its ID */
  deactivateCuy?: Maybe<Scalars['Boolean']>;
  /** deactivatePool Mutation deactivates a pool by its ID */
  deactivatePool?: Maybe<Scalars['Boolean']>;
  /** deactivateShed Mutation deactivates shed by its ID */
  deactivateShed?: Maybe<Scalars['Boolean']>;
  /** deleteCuy mutation deletes a cuy by its ID */
  deleteCuy?: Maybe<Scalars['Boolean']>;
  /** deleteOperationOfRole mutation deletes a operation from role */
  deleteOperationOfRole?: Maybe<Scalars['Boolean']>;
  /** deletePool Mutation deletes pool by its ID */
  deletePool?: Maybe<Scalars['Boolean']>;
  /** deleteRole mutation deletes a role */
  deleteRole?: Maybe<Scalars['Boolean']>;
  /** deleteRoleOfUser mutation to delete role from a user */
  deleteRoleOfUser?: Maybe<Scalars['Boolean']>;
  /** deleteShed Mutation deletes shed by its ID */
  deleteShed?: Maybe<Scalars['Boolean']>;
  /** deleteUser mutation to delete user */
  deleteUser?: Maybe<Scalars['Boolean']>;
  /** login mutation to login in system */
  login?: Maybe<AuthData>;
  /** registerDeathCuy mutation to add death cuy */
  registerDeathCuy?: Maybe<Scalars['Boolean']>;
  /** registerSacaCuy mutation to add saca of cuy */
  registerSacaCuy?: Maybe<Scalars['Boolean']>;
  removeDeathCuy?: Maybe<Scalars['Boolean']>;
  /** removeSacaCuy mutation to remove saca of cuy */
  removeSacaCuy?: Maybe<Scalars['Boolean']>;
  /** removeWeightOfCuy mutation to remove weight of cuy */
  removeWeightOfCuy?: Maybe<Scalars['Boolean']>;
  /** resetPasswordOfUser mutation to reset password of user */
  resetPasswordOfUser?: Maybe<Scalars['Boolean']>;
  /** signup mutation to add user */
  signup?: Maybe<User>;
  /** updateAccessOfUser mutation to grant access to user for active or inactive objects */
  updateAccessOfUser?: Maybe<Scalars['Boolean']>;
  /** updateCuy mutation updates cuy by its ID */
  updateCuy?: Maybe<Cuy>;
  /** updateDeathOfCuy mutation to update death of cuy */
  updateDeathOfCuy?: Maybe<Scalars['Boolean']>;
  /** updateMobilization mutation updates a mobilization */
  updateMobilization?: Maybe<Mobilization>;
  /** updatePool Mutation updates a pool by its ID */
  updatePool?: Maybe<Pool>;
  /** updateRole mutation updates a role */
  updateRole?: Maybe<Role>;
  /** updateSacaCuy mutation to update saca of cuy */
  updateSacaCuy?: Maybe<Scalars['Boolean']>;
  /** updateShed Mutation updates a shed by its ID */
  updateShed?: Maybe<Shed>;
  /** updateUser mutation to update user */
  updateUser?: Maybe<User>;
  /** updateWeightOfCuy mutation to update weight of cuy */
  updateWeightOfCuy?: Maybe<Scalars['Boolean']>;
};


export type MutationActivateCuyArgs = {
  idCuy: Scalars['ID'];
};


export type MutationActivatePoolArgs = {
  idPool: Scalars['ID'];
};


export type MutationActivateShedArgs = {
  idShed: Scalars['ID'];
};


export type MutationAddCuyArgs = {
  cuy: CuyInput;
};


export type MutationAddMobilizationArgs = {
  mobilization: MobilizationInput;
};


export type MutationAddOperationToRoleArgs = {
  idOperation: Scalars['ID'];
  idRole: Scalars['ID'];
};


export type MutationAddPoolArgs = {
  pool: PoolInput;
};


export type MutationAddRoleArgs = {
  role: RoleInput;
};


export type MutationAddRoleToUserArgs = {
  idRole: Scalars['ID'];
  idUser: Scalars['ID'];
};


export type MutationAddShedArgs = {
  shed: ShedInput;
};


export type MutationAddWeightToCuyArgs = {
  idCuy: Scalars['ID'];
  weight: WeightInput;
};


export type MutationDeactivateCuyArgs = {
  idCuy: Scalars['ID'];
};


export type MutationDeactivatePoolArgs = {
  idPool: Scalars['ID'];
};


export type MutationDeactivateShedArgs = {
  idShed: Scalars['ID'];
};


export type MutationDeleteCuyArgs = {
  idCuy: Scalars['ID'];
};


export type MutationDeleteOperationOfRoleArgs = {
  idOperation: Scalars['ID'];
  idRole: Scalars['ID'];
};


export type MutationDeletePoolArgs = {
  idPool: Scalars['ID'];
};


export type MutationDeleteRoleArgs = {
  idRole: Scalars['ID'];
};


export type MutationDeleteRoleOfUserArgs = {
  idRole: Scalars['ID'];
  idUser: Scalars['ID'];
};


export type MutationDeleteShedArgs = {
  idShed: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  idUser: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterDeathCuyArgs = {
  death: DeathInput;
  idCuy: Scalars['ID'];
};


export type MutationRegisterSacaCuyArgs = {
  idCuy: Scalars['ID'];
  saca: SacaInput;
};


export type MutationRemoveDeathCuyArgs = {
  idCuy: Scalars['ID'];
};


export type MutationRemoveSacaCuyArgs = {
  idCuy: Scalars['ID'];
};


export type MutationRemoveWeightOfCuyArgs = {
  idCuy: Scalars['ID'];
  idWeight: Scalars['ID'];
};


export type MutationResetPasswordOfUserArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationSignupArgs = {
  user: UserInput;
};


export type MutationUpdateAccessOfUserArgs = {
  access: AccessUpdate;
  idUser: Scalars['ID'];
};


export type MutationUpdateCuyArgs = {
  idCuy: Scalars['ID'];
  update: CuyUpdate;
};


export type MutationUpdateDeathOfCuyArgs = {
  death: DeathUpdate;
  idCuy: Scalars['ID'];
};


export type MutationUpdateMobilizationArgs = {
  idMobilization: Scalars['ID'];
  update: MobilizationUpdate;
};


export type MutationUpdatePoolArgs = {
  idPool: Scalars['ID'];
  update: PoolUpdate;
};


export type MutationUpdateRoleArgs = {
  idRole: Scalars['ID'];
  role: RoleUpdate;
};


export type MutationUpdateSacaCuyArgs = {
  idCuy: Scalars['ID'];
  saca: SacaUpdate;
};


export type MutationUpdateShedArgs = {
  idShed: Scalars['ID'];
  update: ShedUpdate;
};


export type MutationUpdateUserArgs = {
  idUser: Scalars['ID'];
  user: UserUpdate;
};


export type MutationUpdateWeightOfCuyArgs = {
  idCuy: Scalars['ID'];
  idWeight: Scalars['ID'];
  update: WeightUpdate;
};

export type Operation = {
  __typename?: 'Operation';
  _id?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Int']>;
};

export type Pool = {
  __typename?: 'Pool';
  _id?: Maybe<Scalars['ID']>;
  active?: Maybe<Scalars['Boolean']>;
  code?: Maybe<Scalars['String']>;
  created_date?: Maybe<Scalars['DateTime']>;
  cuys?: Maybe<CuyPaginationPool>;
  description?: Maybe<Scalars['String']>;
  phase?: Maybe<Scalars['String']>;
  population?: Maybe<Array<Maybe<Population>>>;
  total_population?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  updated_date?: Maybe<Scalars['DateTime']>;
};


export type PoolCuysArgs = {
  filter: Scalars['Boolean'];
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

export type PoolPagination = {
  __typename?: 'PoolPagination';
  poolList?: Maybe<Array<Maybe<Pool>>>;
  totalNumPools?: Maybe<Scalars['Int']>;
};

export type PoolPaginationShed = {
  __typename?: 'PoolPaginationShed';
  poolList?: Maybe<Array<Maybe<Pool>>>;
  totalNumPools?: Maybe<Scalars['Int']>;
};

export type Pools = {
  __typename?: 'Pools';
  poolList?: Maybe<Array<Maybe<Pool>>>;
  totalNumPools?: Maybe<Scalars['Int']>;
};

export type Population = {
  __typename?: 'Population';
  genre?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  /** cuys query finds and returns all cuys */
  cuys?: Maybe<Cuys>;
  /** getAllCuysOfPool query finds and returns all cuys in Pool */
  getAllCuysOfPool?: Maybe<CuyPaginationPool>;
  /** getCuyByEarring query finds and returns a cuy by its earring */
  getCuyByEarring?: Maybe<Cuy>;
  /** getCuyByID query finds and returns cuy by its ID */
  getCuyByID?: Maybe<Cuy>;
  /** getCuysByGenre query finds and returns a list of cuys by their genre */
  getCuysByGenre?: Maybe<CuyPagination>;
  /** getCuysByRace query finds and returns a list of cuys by their race */
  getCuysByRace?: Maybe<CuyPagination>;
  /** getDeathCuysReport query finds and returns all death cuys */
  getDeathCuysReport?: Maybe<CuyReportPagination>;
  /** getMobilizationReports query to find and return mobilizations */
  getMobilizationReports?: Maybe<MobilizationReportPagination>;
  /** getPoolByCode query to find a pool by its code */
  getPoolByCode?: Maybe<Pool>;
  /** getPoolByID query to find a pool by its ID */
  getPoolByID?: Maybe<Pool>;
  /** getPoolsByPhase query to find pools by their phase */
  getPoolsByPhase?: Maybe<PoolPagination>;
  /** getPoolsByShed query to find and return all pool of shed */
  getPoolsByShed?: Maybe<PoolPaginationShed>;
  /** getPoolsByType query to find pools by their type */
  getPoolsByType?: Maybe<PoolPagination>;
  /** getSacaCuysReport query finds and returns all Saca cuys */
  getSacaCuysReport?: Maybe<CuyReportPagination>;
  /** getShedByID query to find and return a shed by its ID */
  getShedByID?: Maybe<Shed>;
  /** getShedsStatistics query to get table of population */
  getShedsStatistics?: Maybe<Array<Maybe<ShedsStatistics>>>;
  /** operationById query to find and return a operation by its ID */
  operationById?: Maybe<Operation>;
  /** operations query to get all operations in collection */
  operations?: Maybe<Array<Maybe<Operation>>>;
  /** pools query to find and return all pools */
  pools?: Maybe<Pools>;
  /** roleById query to find and return a role by its ID */
  roleById?: Maybe<Role>;
  /** roles query to get all roles in collection */
  roles?: Maybe<Array<Maybe<Role>>>;
  /** sheds query to find and return all sheds */
  sheds?: Maybe<ShedPagination>;
  /** userById query to find and return a user by its ID */
  userById?: Maybe<User>;
  /** userInfo query to get current user of token */
  userInfo?: Maybe<User>;
  /** users query to get all users */
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryCuysArgs = {
  filter: Scalars['Boolean'];
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetAllCuysOfPoolArgs = {
  filter: Scalars['Boolean'];
  idPool: Scalars['ID'];
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetCuyByEarringArgs = {
  earring: Scalars['String'];
};


export type QueryGetCuyByIdArgs = {
  idCuy: Scalars['ID'];
};


export type QueryGetCuysByGenreArgs = {
  filter: Scalars['Boolean'];
  genre: GenreCuy;
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetCuysByRaceArgs = {
  filter: Scalars['Boolean'];
  limit?: Maybe<Scalars['Int']>;
  race: Scalars['String'];
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetDeathCuysReportArgs = {
  dateFrom?: Maybe<Scalars['DateTime']>;
  dateTo?: Maybe<Scalars['DateTime']>;
  idPool?: Maybe<Scalars['ID']>;
  idShed?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['Int']>;
  reason?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetMobilizationReportsArgs = {
  dateFrom?: Maybe<Scalars['DateTime']>;
  dateTo?: Maybe<Scalars['DateTime']>;
  destination?: Maybe<Scalars['ID']>;
  from?: Maybe<Scalars['ID']>;
  idCuy?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['Int']>;
  reason?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetPoolByCodeArgs = {
  code: Scalars['String'];
};


export type QueryGetPoolByIdArgs = {
  idPool: Scalars['ID'];
};


export type QueryGetPoolsByPhaseArgs = {
  filter: Scalars['Boolean'];
  idShed: Scalars['ID'];
  limit?: Maybe<Scalars['Int']>;
  phase: Scalars['String'];
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetPoolsByShedArgs = {
  filter: Scalars['Boolean'];
  idShed: Scalars['ID'];
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetPoolsByTypeArgs = {
  filter: Scalars['Boolean'];
  idShed: Scalars['ID'];
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
};


export type QueryGetSacaCuysReportArgs = {
  dateFrom?: Maybe<Scalars['DateTime']>;
  dateTo?: Maybe<Scalars['DateTime']>;
  idPool?: Maybe<Scalars['ID']>;
  idShed?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['Int']>;
  reason?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetShedByIdArgs = {
  idShed: Scalars['ID'];
};


export type QueryOperationByIdArgs = {
  idOperation: Scalars['ID'];
};


export type QueryPoolsArgs = {
  filter: Scalars['Boolean'];
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryRoleByIdArgs = {
  idRole: Scalars['ID'];
};


export type QueryShedsArgs = {
  filter: Scalars['Boolean'];
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryUserByIdArgs = {
  id: Scalars['ID'];
};

export type Role = {
  __typename?: 'Role';
  _id?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  operations?: Maybe<Array<Maybe<Operation>>>;
};

export type Saca = {
  __typename?: 'Saca';
  certified_by?: Maybe<UserReports>;
  created_date?: Maybe<Scalars['DateTime']>;
  date?: Maybe<Scalars['DateTime']>;
  reason?: Maybe<Scalars['String']>;
  reference_doc?: Maybe<Scalars['String']>;
  updated_date?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UserReports>;
};

export type Shed = {
  __typename?: 'Shed';
  _id?: Maybe<Scalars['ID']>;
  active?: Maybe<Scalars['Boolean']>;
  children_number_cuys?: Maybe<Scalars['Int']>;
  code?: Maybe<Scalars['String']>;
  created_date?: Maybe<Scalars['DateTime']>;
  details?: Maybe<Scalars['String']>;
  female_number_cuys?: Maybe<Scalars['Int']>;
  male_number_cuys?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  pools?: Maybe<PoolPaginationShed>;
  total_number_cuys?: Maybe<Scalars['Int']>;
  updated_date?: Maybe<Scalars['DateTime']>;
};


export type ShedPoolsArgs = {
  filter: Scalars['Boolean'];
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

export type ShedPagination = {
  __typename?: 'ShedPagination';
  shedList?: Maybe<Array<Maybe<Shed>>>;
  totalNumSheds?: Maybe<Scalars['Int']>;
};

export type ShedsStatistics = {
  __typename?: 'ShedsStatistics';
  _id?: Maybe<Scalars['ID']>;
  alive_cuys?: Maybe<Scalars['Int']>;
  code?: Maybe<Scalars['String']>;
  dead_cuys?: Maybe<Scalars['Int']>;
  details?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  saca_cuys?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  accessLifeCycle?: Maybe<Access>;
  dni?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  names?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Role>>>;
};

export type UserReports = {
  __typename?: 'UserReports';
  _id?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  names?: Maybe<Scalars['String']>;
};

export type Weight = {
  __typename?: 'Weight';
  _id?: Maybe<Scalars['ID']>;
  created_date?: Maybe<Scalars['DateTime']>;
  photo?: Maybe<Scalars['String']>;
  updated_date?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UserReports>;
  weight?: Maybe<Scalars['Float']>;
};

export enum GenreCuy {
  Cria = 'CRIA',
  Hembra = 'HEMBRA',
  Macho = 'MACHO'
}

export type AccessUpdate = {
  active?: Maybe<Scalars['Boolean']>;
  inactive?: Maybe<Scalars['Boolean']>;
};

export type CuyInput = {
  birthday_date: Scalars['DateTime'];
  color: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  earring: Scalars['String'];
  genre: GenreCuy;
  observation?: Maybe<Scalars['String']>;
  pool: Scalars['ID'];
  race: Scalars['String'];
};

export type CuyUpdate = {
  birthday_date?: Maybe<Scalars['DateTime']>;
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  earring?: Maybe<Scalars['String']>;
  genre?: Maybe<GenreCuy>;
  observation?: Maybe<Scalars['String']>;
  race?: Maybe<Scalars['String']>;
};

export type DeathInput = {
  certified_by: Scalars['ID'];
  date: Scalars['DateTime'];
  reason: Scalars['String'];
  reference_doc?: Maybe<Scalars['String']>;
};

export type DeathUpdate = {
  certified_by?: Maybe<Scalars['ID']>;
  date?: Maybe<Scalars['DateTime']>;
  reason?: Maybe<Scalars['String']>;
  reference_doc?: Maybe<Scalars['String']>;
};

/** Input document when mobilization is added */
export type MobilizationInput = {
  /** ID of cuy to be mobilized */
  cuy: Scalars['ID'];
  /** Date when cuy was mobilized */
  date: Scalars['DateTime'];
  /** pool ID destine of cuy */
  destination: Scalars['ID'];
  /** pool ID origin of cuy */
  origin: Scalars['ID'];
  /** Reason why cuy is being mobilized */
  reason: Scalars['String'];
  /** Url of reference document */
  reference_doc?: Maybe<Scalars['String']>;
};

/** Update document when mobilization is updated */
export type MobilizationUpdate = {
  /** Date when cuy was mobilized */
  date?: Maybe<Scalars['DateTime']>;
  /** Reason why cuy is being mobilized */
  reason?: Maybe<Scalars['String']>;
  /** Url of reference document */
  reference_doc?: Maybe<Scalars['String']>;
};

export type PoolInput = {
  code: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  phase: Scalars['String'];
  shed: Scalars['ID'];
  type: Scalars['String'];
};

export type PoolUpdate = {
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  phase?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type RoleInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type RoleUpdate = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type SacaInput = {
  certified_by: Scalars['ID'];
  date: Scalars['DateTime'];
  reason: Scalars['String'];
  reference_doc?: Maybe<Scalars['String']>;
};

export type SacaUpdate = {
  certified_by?: Maybe<Scalars['ID']>;
  date?: Maybe<Scalars['DateTime']>;
  reason?: Maybe<Scalars['String']>;
  reference_doc?: Maybe<Scalars['String']>;
};

export type ShedInput = {
  code: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type ShedUpdate = {
  code?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type UserInput = {
  dni?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  names: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
};

export type UserUpdate = {
  dni?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  names?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
};

export type WeightInput = {
  photo: Scalars['String'];
  weight: Scalars['Float'];
};

export type WeightUpdate = {
  photo?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
};

