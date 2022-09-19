import { IHttpRequest } from "./http-request";

export abstract class BaseController { 
  protected abstract executeUseCase (httpRequest:IHttpRequest): Promise<void | any>;
  
  public async execute(httpRequest:IHttpRequest): Promise<void | any> {
    return this.executeUseCase(httpRequest);
  }
}