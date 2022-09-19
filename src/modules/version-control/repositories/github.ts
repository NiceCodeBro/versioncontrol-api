import { AxiosError } from "axios";
import { IVersionControlRepository } from ".";
import { ApiError } from "../../../shared/error-types/api-error";
import { NotFoundError } from "../../../shared/error-types/not-found-error";
import { IVersionControlApi } from "../external-apis/github-api";
import { IGetAllPublicReposRequest, IGetMostPopularReposResponse, IRepository } from "../use-cases";

export class GitHubRepository implements IVersionControlRepository {
  constructor(private _githubApi:IVersionControlApi) {}

  async getMostPopularRepos(request:IGetAllPublicReposRequest): Promise<IGetMostPopularReposResponse>  {
    try {
      const props = {dateFrom: request.dateFrom, perPage: request.perPage};
      const repos = await this._githubApi.getMostPopularRepos(props);

      const repositories = repos.items.map((repo) => ({
          name: repo.name,
          fullName: repo.full_name,
          numOfStars: repo.stargazers_count,
          creationDate: repo.created_at,
          language: repo.language
      }));
      return {repositories} as IGetMostPopularReposResponse;
    } catch(err) {
      const error = err as AxiosError;
      if (error.isAxiosError && error.response?.status === 404) {
        throw new NotFoundError();
      }
      throw new ApiError();
    } 
  }
}
