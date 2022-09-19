import { app } from "../../..";
import supertest from "supertest";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockResolveValues = {
  items: [{
    id: 255691256,
    name: 'X-Road',
    full_name: 'jakky/X-Road',
    description: 'Source code of the X-Road data exchange layer software.',
    stargazers_count: 5,
    language: 'Java',
    created_at: '2020-08-14'
  },
  {
    id: 255691495,
    name: 'X-Road-tests',
    full_name: 'jakky/X-Road-tests',
    description: null,
    stargazers_count: 2,
    language: 'JavaScript',
    created_at: '2021-10-14'
  },
  {
    id: 255697795,
    name: 'X-Road-Play',
    full_name: 'jakky/X-Road-play',
    description: null,
    stargazers_count: 7,
    language: 'JavaScript',
    created_at: '2020-06-14'
  }]
};

const apiBasePath = '/api/v1/version-control/github';

describe('/api/v1/version-control/github/popular-repositories should', ()=> {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('return 200 and a list of repos', async () => {
    //given
    mockedAxios.get.mockResolvedValueOnce({data: mockResolveValues});

    // when
    const response = await supertest(app).get(`${apiBasePath}/popular-repositories`)
                                         .query({date_from: '2021-10-10', per_page: 20});

    // then
    const expected = {
      repositories: [
        {"creationDate": "2020-08-14", "fullName": "jakky/X-Road", "language": "Java", "name": "X-Road", "numOfStars": 5}, 
        {"creationDate": "2021-10-14", "fullName": "jakky/X-Road-tests", "language": "JavaScript", "name": "X-Road-tests", "numOfStars": 2}, 
        {"creationDate": "2020-06-14", "fullName": "jakky/X-Road-play", "language": "JavaScript", "name": "X-Road-Play", "numOfStars": 7}
    ]}
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expected);
  })

  it('return 200 and filter result by JavaScript', async () => {
    //given
    mockedAxios.get.mockResolvedValueOnce({data: mockResolveValues});

    // when
    const response = await supertest(app).get(`${apiBasePath}/popular-repositories`)
                                         .query({date_from: '2021-10-10', per_page: 20, language_filter: 'JavaScript' });
    // then
    const expected = {
      repositories: [
        {"creationDate": "2021-10-14", "fullName": "jakky/X-Road-tests", "language": "JavaScript", "name": "X-Road-tests", "numOfStars": 2}, 
        {"creationDate": "2020-06-14", "fullName": "jakky/X-Road-play", "language": "JavaScript", "name": "X-Road-Play", "numOfStars": 7}
    ]}
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expected);
  })

  it('return 400 and if date_from does not exist in query', async () => {
    //given
    mockedAxios.get.mockResolvedValueOnce({data: mockResolveValues});

    // when
    const response = await supertest(app).get(`${apiBasePath}/popular-repositories`)
                                         .query({per_page: 20});
    // then

    const expected =  {"message": "Bad Request"}
    expect(response.status).toEqual(400);
    expect(response.body).toEqual(expected);
  })

  it('return 400 and if per_apge is not numeric', async () => {
    //given
    mockedAxios.get.mockResolvedValueOnce({data: mockResolveValues});

    // when
    const response = await supertest(app).get(`${apiBasePath}/popular-repositories`)
                                         .query({per_page: 'not_numeric_string', date_from: '2021-10-10'});
    // then

    const expected =  {"message": "Bad Request"}
    expect(response.status).toEqual(400);
    expect(response.body).toEqual(expected);
  })

  it('return 503 and Service Unavailable if api throw an error', async () => {
    //given
    mockedAxios.get.mockImplementation(() => { throw new Error(); });
    
    // when
    const response = await supertest(app).get(`${apiBasePath}/popular-repositories`)
                                         .query({date_from: '2021-10-10', per_page: 20});
    // then
    const expected =  {"message": "Service Unavailable"}
    expect(response.status).toEqual(503);
    expect(response.body).toEqual(expected);
  })
})