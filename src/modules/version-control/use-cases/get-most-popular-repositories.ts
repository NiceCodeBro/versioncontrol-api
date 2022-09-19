import { IGetAllPublicReposRequest, IGetMostPopularReposResponse } from ".";
import { IUseCase } from "../../../shared/use-case-interface";
import { IVersionControlRepository } from "../repositories";

export class GetMostPopularReposUseCase implements 
                    IUseCase<IGetAllPublicReposRequest, IGetMostPopularReposResponse> {
  constructor(private _versionControlRepository: IVersionControlRepository) {}
  
  async execute(request: IGetAllPublicReposRequest): Promise<IGetMostPopularReposResponse> {     
    // validate perPage type and either 10-30-50
       
    const repos = await this._versionControlRepository.getMostPopularRepos(request);


    if (typeof request.languageFilter === 'string' && request.languageFilter.length > 0) {
      return { repositories: repos.repositories.filter(repo => repo.language === request.languageFilter) }
    }
    return repos;
  }
}
