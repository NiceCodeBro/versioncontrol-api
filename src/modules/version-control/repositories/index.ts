import { BaseRepository } from "../../../shared/base-repository";
import { IGetAllPublicReposResponse } from "./github";

export interface IVersionControlRepository extends BaseRepository<any> {
  getMostPopularRepos(): Promise<IGetAllPublicReposResponse[]>;
}

export * from "./github"