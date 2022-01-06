import { userRepos } from './github';

import fetch from 'cross-fetch';
jest.mock('cross-fetch');
const { Response } = jest.requireActual('cross-fetch');

describe('GitHub APIs', () => {

    beforeEach(async () => {
        jest.resetAllMocks();
      });

    it('throws error when token is missing', async () => {

        // setup
        const expectedRepos = require("../json/user-repos_pat_1.json");
        const mock = (fetch as unknown) as jest.Mock;
        mock.mockResolvedValue(new Response(JSON.stringify(expectedRepos)));
        const personalAccessToken = undefined;

        // test
        await expect(userRepos(undefined))
        .rejects
        .toThrow('Required token is empty');
      
        // validate
        expect(mock).toHaveBeenCalledTimes(0);
    });
    it('successfully gets authenticated user repos', async () => {

        // setup
        const expectedRepos = require("../json/user-repos_pat_1.json");
        const environmentValues = require('../local.settings.json').Values;
        const mock = (fetch as unknown) as jest.Mock;
        mock.mockResolvedValue(new Response(JSON.stringify(expectedRepos)));
        const personalAccessToken = environmentValues.GITHUB_TEST_PERSON_ACCESS_TOKEN;

        // test
        const repos = await userRepos(personalAccessToken);
      
        // validate
        expect(repos.length).toEqual(expectedRepos.length);
        expect(JSON.stringify(repos)).toEqual(JSON.stringify(expectedRepos));
        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith("https://api.github.com/user/repos?visibility=all&affiliation=owner%2Ccollaborator%2Corganization_member&type=all&sort=full_name&page=1&per_page=100", {"headers": {"Accept": "application/vnd.github.v3+json", "Authorization": "token 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", "Content-Type": "application/json"}, "method": "GET"})
    });
});