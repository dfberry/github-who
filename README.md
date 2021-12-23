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
* client: add nav bar and bootstrap
* client: add routes/routing
* client: github auth:
    * .env for github config
    * add login button for github auth
    * add /auth-redirect route to get `code`
    * add api call to server
* api github token: 
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
* playwright
    * initial test to validate deployment to live server
* github action on pr
    * run client tests

## Azure Function

* managed - can't seem to see context.log the same way as an independent function
* unmanaged/independent function - if it is set up in Static web app, it is still proxied from the SWA client 


