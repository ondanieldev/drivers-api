<!-- Title -->
<h1 align="center">
  <a href="#" style="color: #085687;">
    Drivers API
  </a>
</h1>

<!-- Slogan -->
<p align="center">
  <strong>A RESTful API to manage automobiles, drivers and usages</strong><br>
</p>

<!-- GitHub Badges -->
<p align="center">
  <a href="https://github.com/ondanieldev/drivers-api/actions/workflows/ci.yaml">
    <img src="https://github.com/ondanieldev/drivers-api/actions/workflows/ci.yaml/badge.svg" alt="CI status." />
  </a>
</p>

<!-- Repository Badges -->
<p align="center">
  <a href="https://github.com/ondanieldev/drivers-api/blob/HEAD/package.json">
    <img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fondanieldev%2Fdrivers-api%2Fraw%2FHEAD%2Fpackage.json&query=%24.version&label=Current%20version&color=085687" alt="Current version." />
  </a>
  <a href="https://github.com/ondanieldev/drivers-api/blob/HEAD/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-085687.svg" alt="Released under the MIT license." />
  </a>
</p>

<!-- Body -->
## Description

Drivers API is a RESTful API built to apply to a job position at [Seidor](https://www.seidor.com/en-br).
It contains two main modules to manage automobiles, drivers and a usage relationship between these two entities.

## How to setup

- Node:
  - Run `yarn` to install dependencies.
- Environment variables:
  - Copy `.env.example` to a new `.env` file;
  - Fill/replace `.env` with the required credentials.

## How to run

- Run `yarn run:dev`.

## How to test

### Running unit tests

- Run `yarn test:unit` to execute tests;
- Run `yarn test:unit:cov` to execute tests and generate coverage reports:
  - Coverage reports will be available under `test/coverage` folder.

### Sending HTTP requests via Swagger

- If you are running locally, you can access Swagger by clicking [here](http://localhost:3000/api):
  - Please note that the link above uses the default port `3000`. So if you have changed it, then you must change on the link as well.
- If you want to try it out without running locally, you can access the deployed version by clicking [here](https://drivers-api.ondaniel.com.br/api).

### Sending HTTP requests via Insomnia

- There is an [Insomnia repository](https://docs.insomnia.rest/insomnia/git-sync) that stores all Insomnia files related to this API. You can follow [Insomnia Git Sync](https://docs.insomnia.rest/insomnia/git-sync) instrunctions to use it.

## How to lint

- Run `yarn fix` to fix linting issues;
- Run `yarn lint` to check for linting issues. If some of them was not solved by `yarn fix`, you will see related files and description on terminal, so you can manually solve them.

## How to build

- Run `yarn build`.

## How to deploy

- Setup the following [GitHub secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository):
  - SSH_HOST:
    - It is your server host. e.g.: `122.0.0.1`.
  - SSH_USER:
    - It is your server user. e.g.: `root`.
  - SSH_PORT:
    - It is your server ssh port. Usually it is `22`.
  - SSH_KEY:
    - You can generate a new ssh key-pair on linux by running `ssh-keygen`;
    - Once generated, copy the public key to your server's `authorized_keys` file, which is usually located at `.ssh/authorized_keys`;
    - The private key, on the other hand, is the value of the secret.
- Every push to the `develop` branch will trigger a GitHub CI workflow. This workflow is available under the `.github/workflows` folder. Once ran, the code will be deployed on the server.

## Links

- [API](https://drivers-api.ondaniel.com.br)
- [Insomnia](https://github.com/ondanieldev/drivers-api-insomnia)
- [Swagger](https://drivers-api.ondaniel.com.br/api)
- [Data structure](https://github.com/ondanieldev/drivers-api/tree/HEAD/docs/data-structure)
- [Business requirements](https://github.com/ondanieldev/drivers-api/tree/HEAD/docs/requirements)
