export interface IHttpResponse {
  headers: any,
  statusCode: number,
  body: any
}

export const buildHttpResponse = (statusCode: number, body: any): IHttpResponse => {
  return { headers: {'Content-Type': 'application/json'}, statusCode, body }
}