import { IGetMostPopularReposRequest, IGetMostPopularReposResponse } from ".";
import { InputValidationError } from "../../../shared/error-types/input-validation-error";
import { IUseCase } from "../../../shared/use-case";
import { IVersionControlRepository } from "../repositories";

export class GetMostPopularReposUseCase implements 
                    IUseCase<IGetMostPopularReposRequest, IGetMostPopularReposResponse> {
  constructor(private _versionControlRepository: IVersionControlRepository) {}
  
  async execute(request: IGetMostPopularReposRequest): Promise<IGetMostPopularReposResponse> {     
    this.validateRequest(request);
    
    return await this._versionControlRepository.getMostPopularRepos(request);
  }

  validateRequest = (request: IGetMostPopularReposRequest) => {
    if (request.perPage !== undefined && ![10, 50, 100].find(n => n === request.perPage)) {
      throw new InputValidationError("per page can only be one of 10, 50, 100.");
    }

    if (request.dateFrom > new Date()) {
      throw new InputValidationError('date from can not be in the future.');
    }
  }
}
