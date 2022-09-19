import Router, { Request, Response } from 'express';
import { BootstrapControllerGetPopularGitHubRepos } from '../../bootstraps';
import { expressAdapter } from "../../express-adapter";

const versionControlRoutes = Router();

const getPopularGitHubReposController = BootstrapControllerGetPopularGitHubRepos();

versionControlRoutes.get("/github/popular-repositories", 
    async (req:Request, res:Response) => await expressAdapter(req, res, getPopularGitHubReposController));

export {versionControlRoutes};