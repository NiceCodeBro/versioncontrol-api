import axios from "axios";
import { GitHubApi } from "../github-api";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GitHub Api `s', ()=> {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('getMostPopularRepos should be called with dateFrom, language and perPage in a right structure', async () => {
    //given
    const perPage = 50;
    const dateFrom = '2020-10-10';
    const language = 'JavaScript';
    mockedAxios.get.mockResolvedValueOnce({data: {}});

    // when
    const github = new GitHubApi();
    github.getMostPopularRepos({dateFrom: new Date(dateFrom), languageFilter: language, perPage});


    // then
    const expectedUrl = `https://api.github.com/search/repositories?q=created:>${dateFrom}+language:${language}`;
    const expectedHeader  = {"headers": {"Accept": "application/json"}, params: {"order": "desc", "per_page": perPage, "sort": "star"} }
    expect(axios.get).toHaveBeenCalledWith(expectedUrl, expectedHeader);
  })
})