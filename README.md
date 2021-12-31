# github-who

# GitHub oauth app

* Create 1 app for live app & live redirect URL
    * Create secret
* Create 1 app for your local dev environment with redirect to localhost:3000
    * Create secret
    * Set /client folder's `.env` file with values
    * Set /api folder's `local.settings.json` with values including secret

## Tasks

* client: create-react-app
    * create in /client
* client: add nav bar and bootstrap
* vscode: create static web app for react/api
* client: add routes/routing
    * add routes.tsx
    * add staticwebapp.config.json
* client: github auth:
    * .env for github config
    * add login button for github auth
    * add /auth-redirect route to get `code`
    * add api call to server
* api github token: 
    * create local project with vs code extension for azure functions in /api
    * add env var for github config and secrets
    * add api to exchange `code` for `token` 
    * extend api to use `token` to get user profile
    * return token and profile
* github action for deployment
* client UI: 
    * table component to display token and user profile with bootstrap
* client state: 
    * add redux state management for github config
    * add action for User state property
    * fix redux state test
* azure portal
    * function api config settings and secrets
    * 500 - never figured this 500 out - happens before api is called
* git branch and hash 
    * ./scripts/build-commit.js
        * local build - must be in .env before build
        * remote build - new steps to pull in 
* playwright
    * initial test to validate deployment to live server
* github action on pr
    * run client tests
* edit/refactor action
    * checkout new branch from main
    * change action to only run on pushes to that branch - while developing
    * when action is fixed, change/revert to the origin `on` push and prs
    * merge back into regular pipeline
    * notes: run doesn't retain context from run to next item in yaml using run

## Azure Function

* managed - can't seem to see context.log the same way as an independent function
* unmanaged/independent function - if it is set up in Static web app, it is still proxied from the SWA client 

## Current issues

* SO: [playwright doesn't run in dev container](https://stackoverflow.com/questions/70500141/playwright-wont-run-in-vscode-dev-container-on-mac)

## Pipeline management

* Checkout out from main
* Change, run local test (client, api, or e2e)
* PR to main
    * PR runs tests and automerges if possible