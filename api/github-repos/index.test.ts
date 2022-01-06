import httpTrigger from './index';
import fetch from 'cross-fetch';
const { Response } = jest.requireActual('cross-fetch');
const config = require('../local.settings.json');

import {
  runStubFunctionFromBindings,
  createHttpTrigger,
} from 'stub-azure-function-context';

jest.mock('cross-fetch');

describe('GitHub User repos', () => {

  beforeEach(async () => {
    jest.resetAllMocks();
    process.env = Object.assign(process.env, {
      ...config.Values
    });
    
  });

  it('fails on missing token', async () => {

    const res = await mockedRequestFactory('')

    expect(res.statusCode).toEqual(400)

    const body = JSON.parse(res.body)
    expect(body.error.includes('token is required but wasn\'t found')).toBeTruthy();

    const mock = (fetch as unknown) as jest.Mock
    expect(mock).toHaveBeenCalledTimes(0)
  });

  it('succeeds to return repo list', async () => {

    const personalAccessToken: string = process.env.GITHUB_TEST_PERSON_ACCESS_TOKEN;
    const knownRepoList = require('../json/user-repos_pat_1.json');

    const mock = (fetch as unknown) as jest.Mock;
    mock.mockResolvedValue(new Response(JSON.stringify(knownRepoList)));

    const res = await mockedRequestFactory(personalAccessToken);

    expect(res.statusCode).toEqual(200);

    const body = JSON.parse(res.body);
    expect(JSON.stringify(body)).toEqual(JSON.stringify(knownRepoList));


    expect(mock).toHaveBeenCalledTimes(1);

    const mockValues = expect(mock);

    expect(mock).toHaveBeenCalledWith(expect.stringContaining(`https://api.github.com/user/repos`), expect.anything());
  })

})

async function mockedRequestFactory(token: string) {

  const headers = { Authorization: `token ${token}` };
  const params = {};
  const body = {};
  const query = {};

  return runStubFunctionFromBindings(
    httpTrigger,
    [
      {
        type: 'httpTrigger',
        name: 'req',
        direction: 'in',
        data: createHttpTrigger(
          'GET',
          'http://example.com',
          headers,
          params,
          body,
          query,
        ),
      },
      { type: 'http', name: '$return', direction: 'out' },
    ],
    new Date(),
  )
}
