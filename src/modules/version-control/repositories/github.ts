import { AxiosError } from "axios";
import { IVersionControlRepository } from ".";
import { ApiError } from "../../../shared/error-types/api-error";
import { NotFoundError } from "../../../shared/error-types/not-found-error";
import { IVersionControlApi } from "../external-apis/github-api";

export interface IGetAllPublicReposResponse {
  name: string;
  fullName: string;
  numOfStars: number;
  creationDate: string;
  language: string
}

export class GitHubRepository implements IVersionControlRepository {
  constructor(private _githubApi:IVersionControlApi) {}

  async getMostPopularRepos(): Promise<IGetAllPublicReposResponse[]>  {
    try {
      const d = new Date();
      d.setMonth(d.getMonth() - 1);
      const repos = await this._githubApi.getMostPopularRepos({createdFrom: d, perPage: 10});

      return repos.items.map((repo)=> {
        return {
          name: repo.name,
          fullName: repo.full_name,
          numOfStars: repo.stargazers_count,
          creationDate: repo.created_at,
          language: repo.language
        } as IGetAllPublicReposResponse;
      });
    } catch(err) {
      const error = err as AxiosError;
      if (error.isAxiosError && error.response?.status === 404) {
        throw new NotFoundError();
      }
      throw new ApiError();
    } 
  }
}
