import { IGetAllPublicReposRequest, IGetMostPopularReposResponse } from ".";
import { InputValidationError } from "../../../shared/error-types/input-validation-error";
import { IUseCase } from "../../../shared/use-case-interface";
import { IVersionControlRepository } from "../repositories";

export class GetMostPopularReposUseCase implements 
                    IUseCase<IGetAllPublicReposRequest, IGetMostPopularReposResponse> {
  constructor(private _versionControlRepository: IVersionControlRepository) {}
  
  async execute(request: IGetAllPublicReposRequest): Promise<IGetMostPopularReposResponse> {     
    this.validateRequest(request);
    
    const repos = await this._versionControlRepository.getMostPopularRepos(request);

    if (this.filterByLanguageActive(request.languageFilter)) {
      return { repositories: repos.repositories.filter(repo => repo.language === request.languageFilter) }
    }
    return repos;
  }

  validateRequest = (request:IGetAllPublicReposRequest) => {
    // Per page can only be one of 10,50 or 100 if it is used
    if (request.perPage !== undefined && ![10,50,100].find(n => n === request.perPage)){
      throw new InputValidationError();
    }
  }

  filterByLanguageActive = (languageFilter:string | undefined) => {
    return typeof languageFilter === 'string' && languageFilter.length > 0;
  }
}
