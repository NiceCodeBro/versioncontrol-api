import { IVersionControlRepository } from ".";
import { IVersionControlApi } from "../external-apis/github-api";
import { IGetMostPopularReposRequest, IGetMostPopularReposResponse } from "../use-cases";

export class GitHubRepository implements IVersionControlRepository {
  constructor(private _githubApi:IVersionControlApi) {}

  async getMostPopularRepos(request:IGetMostPopularReposRequest): Promise<IGetMostPopularReposResponse>  {
      const repos = await this._githubApi.getMostPopularRepos({...request});

      const repositories = repos.items.map((repo) => ({
          name: repo.name,
          fullName: repo.full_name,
          numOfStars: repo.stargazers_count,
          creationDate: repo.created_at,
          language: repo.language
      }));
      return {repositories} as IGetMostPopularReposResponse;
  }
}
