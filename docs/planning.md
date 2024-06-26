# Planning

## Architectures

- SOLID
- TDD

## Setup

- [] Setup `TypeScript`
  - [] Install and config `typescript`
  - [] Install and config `tsc`
  - [] Install and config `tsx`
- [] Setup `package.json` scripts
- [] Setup `modules` and `common` folders
- [] Setup code linters
  - [] `eslint`
  - [] `prettier`
  - [] `editorconfig`
- [] Setup Jest for unit testing
- [] Setup `class-validator` and `class-transformer` to enhance DTOs
- [] Setup tsyringe for dependency injection

## Modules

- [] Develop `app` module
  - [] Setup `Express`
  - [] Create server entrypoint
  - [] Create routes entrypoint
  - [] Create base middlewares
    - [] Endpoint logger
    - [] Error handler
- [] Develop `automobile` module
  - [] Create
  - [] Update
  - [] Delete
  - [] Read by id
  - [] Read list
    - [] Allow filtering by `color` and `brand`
- [] Develop `driver` module
  - [] Create
  - [] Update
  - [] Delete
  - [] Read by id
  - [] Read list
    - [] Allow filtering by `name`
- [] Develop relationship between `automobile` and `driver`
  - [] Start
    - [] A `driver` can use only one `automibile` at the same time  
  - [] Finish
  - [] Read list
    - [] Data that must be shown: full `register` object, `driver.name`, full `automobile` object
  
## Docs

- [] Create `README.md`
  - [] Title
  - [] Slogan
  - [] Description
  - [] How to setup
  - [] How to run
  - [] How to test
  - [] How to lint
  - [] Useful links
    - [] Insomnia
    - [] Other docs links
- [] Create synced Insomnia repository

## Improvements

- [] Setup `docker`
  - [] Create `Dockerfile`
  - [] Create `docker-compose.yml`
  - [] Update `README.md` scripts
- [] Implement `PostgreSQL` database
