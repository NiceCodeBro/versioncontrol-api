export interface IGetMostPopularReposRequest {
  languageFilter?: string;
  perPage?: number;
  dateFrom: Date;
}

export interface IRepository {
  name: string;
  fullName: string;
  numOfStars: number;
  creationDate: string;
  language: string
}


export interface IGetMostPopularReposResponse {
  repositories: IRepository[]
}

export * from "./get-most-popular-repositories";
