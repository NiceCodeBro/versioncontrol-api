import { BaseRepository } from "../../../shared/base-repository";
import { IGetMostPopularReposRequest, IGetMostPopularReposResponse } from "../use-cases";

export interface IVersionControlRepository extends BaseRepository<any> {
  getMostPopularRepos(request:IGetMostPopularReposRequest): Promise<IGetMostPopularReposResponse>;
}

export * from "./github"