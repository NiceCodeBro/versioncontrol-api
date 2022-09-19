import { Request, Response } from 'express';
import { InputValidationError } from "../shared/error-types/input-validation-error";
import { ApiError } from "../shared/error-types/api-error";
import { BaseController } from '../shared/base-controller';
import { IHttpRequest } from '../shared/http-request';
import { NotFoundError } from '../shared/error-types/not-found-error';

const httpRequestFrom = (req:Request): IHttpRequest => {
  return {
    body: req.body,
    query: req.query,
    params: req.params,
    ip: req.ip,
    method: req.method,
    path: req.path,
    headers: {
      'Content-Type': req.get('Content-Type'),
      Referer: req.get('referer'),
      'User-Agent': req.get('User-Agent')
    }
  };
}

export async function expressAdapter(req:Request, res: Response, controller:BaseController) {
  try {
    const httpResponse = await controller.execute(httpRequestFrom(req));

    if (httpResponse.headers) res.set(httpResponse.headers);
    
    res.type('json');

    return res.status(httpResponse.statusCode).send(httpResponse.body);
  } catch(error) {
    if (error instanceof InputValidationError) {
      return res.status(400).send({message: error.message.length > 0 ? error.message : 'Bad Request'})
    } if (error instanceof NotFoundError) {
      return res.status(404).send({message: error.message.length > 0 ? error.message : 'Not Found'})
    } else if (error instanceof ApiError) {
      return res.status(503).send({message: error.message.length > 0 ? error.message : 'Service Unavailable'})
    } else {
      return res.status(500).send({message: 'An error is occured.'})
    }
  }
}