import { GetMostPopularReposController } from "../../modules/version-control/controllers";
import { GitHubApi } from "../../modules/version-control/external-apis";
import { GitHubRepository } from "../../modules/version-control/repositories";
import { GetMostPopularReposUseCase } from "../../modules/version-control/use-cases";

export const BootstrapControllerGetPopularRepos = () => {
  const github = new GitHubApi();
  const repository = new GitHubRepository(github);
  const usecase = new GetMostPopularReposUseCase(repository);
  return new GetMostPopularReposController(usecase);
}