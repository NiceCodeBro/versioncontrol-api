import { BaseController } from "../../../shared/base-controller";
import { InputValidationError } from "../../../shared/error-types/input-validation-error";
import { IHttpRequest } from "../../../shared/http-request";
import { buildHttpResponse, IHttpResponse } from "../../../shared/http-response";
import { GetMostPopularReposUseCase } from "../use-cases";

export class GetMostPopularReposController extends BaseController  {
  private _usecase: GetMostPopularReposUseCase;

  constructor(_usecase: GetMostPopularReposUseCase) {
    super();
    this._usecase = _usecase;
  }

  protected async executeUseCase(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const languageFilter = httpRequest.query.language_filter;
    const perPage = httpRequest.query.per_page;
    const dateFrom = httpRequest.query.date_from;

    if (perPage !== undefined && !Number(perPage)) {
      throw new InputValidationError();
    }

    if(!Date.parse(dateFrom)){
      throw new InputValidationError();
    }

    const response = await this._usecase.execute({dateFrom: new Date(dateFrom), languageFilter, perPage});
    return buildHttpResponse(200, response);
  }
}
