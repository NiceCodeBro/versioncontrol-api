
import express from 'express'
import { versionControlRoutes } from './v1/version-control-routes';

const v1Router = express.Router();

v1Router.use('/version-control', versionControlRoutes);

export { v1Router }
