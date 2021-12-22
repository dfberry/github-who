# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Resources

* https://levelup.gitconnected.com/how-to-implement-login-with-github-in-a-react-app-bd3d704c64fc
* http://thecodebarbarian.com/github-oauth-login-with-node-js.html

1. An OAuth app takes action on behalf of a user, whereas a GitHub App is a distinct user. For example, if you log in to a GitHub OAuth app and the OAuth app posts a comment on an issue, that comment will be associated with your GitHub username. On the other hand, if a GitHub App posts on an issue, that comment will be associated with the GitHub App rather than any individual user.

2. OAuth Apps are scoped to an individual user and have the same permissions as that user. GitHub Apps are scoped to an organization or a subset of an organization. This has important implications for installing your app: if you aren't an admin on an organization, you need to request permission to install a GitHub App that interacts with that repo. For example, since the Mongoose GitHub repo is under Automattic's organization, I can't install a GitHub App on the Mongoose repo without Automattic's help. But I can install an OAuth App that pushes to the repo, because OAuth Apps have a subset of my permissions as a GitHub user.

## Oauth scopes

scope=public_repo%20read:repo_hook%20read:org%20read:public_key%20read:user%20user:email%20read:discussion%20read:packages%20read:gpg_key

## Proxy

Static web app proxies to connected Azure function app