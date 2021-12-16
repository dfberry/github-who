import React, { useState, useEffect } from 'react';
import { useEffectAsync } from './Utilties/reactHelpers';
import { requestUserReposFromApi } from './Utilties/github';
import { log } from './Utilties/log';

type Props = {
    token?: React.ReactNode
};
const GitHubRepos: React.FC<Props> = ({ token }) => {

    const [repos, setRepos] = useState<object>({});
    const [error, setError] = useState<object>({});

    useEffectAsync(async () => {
        await getRepos();
    }, []);

    const getRepos = async () => {

        requestUserReposFromApi((token as string) ).then((result:any) => {
            log("verbose", result?.repos);

        }).catch((err: any) => {
            log('error', err)
        });
    }

    return (
        <div className="GitHubRepos">
            GitHub Repos
        </div>
    )
}

export default GitHubRepos;