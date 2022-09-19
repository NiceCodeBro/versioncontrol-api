import { BaseRepository } from "../../../shared/base-repository";
import { IGetAllPublicReposRequest, IGetMostPopularReposResponse } from "../use-cases";

export interface IVersionControlRepository extends BaseRepository<any> {
  getMostPopularRepos(request:IGetAllPublicReposRequest): Promise<IGetMostPopularReposResponse>;
}

export * from "./github"