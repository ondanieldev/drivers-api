# Planning

## Architectures

- SOLID
- TDD

## Setup

- [x] Setup `TypeScript`
  - [x] Install and config `typescript`
  - [x] Install and config `tsc`
  - [x] Install and config `tsx`
- [x] Setup license
- [x] Setup entrypoint
- [x] Setup `.env`
- [x] Setup `.gitignore`
- [x] Setup `package.json` scripts
- [x] Setup `common`, `modules` and `providers` folders
- [x] Setup code linters
  - [x] `eslint`
  - [x] `prettier`
  - [x] `editorconfig`
- [x] Setup Jest for unit testing
- [x] Setup `Express`
  - [x] Setup `cors`
  - [x] Setup `helmet`
  - [x] Create server entrypoint
  - [x] Create base middlewares
    - [x] Endpoint logger
    - [x] Error handler
- [x] Setup `class-validator` and `class-transformer` to enhance DTOs
- [x] Setup tsyringe for dependency injection
- [x] Setup base entities and repositories
- [x] Setup modules pattern

## Modules

- [x] Develop `automobile` module
  - [x] Create
  - [x] Update
  - [x] Delete
  - [x] Read by id
  - [x] Read list
    - [x] Allow filtering by `color` and `brand`
- [x] Develop `driver` module
  - [x] Create
  - [x] Update
  - [x] Delete
  - [x] Read by id
  - [x] Read list
    - [x] Allow filtering by `name`
- [x] Develop `automobile-usage`
  - [x] Start
    - [x] An `automobile` can be only used by one `driver` at the same time
    - [x] A `driver` can use only one `automobile` at the same time  
    - [x] An `automobile-usage` cannot be started for an `automobile` that does not exist  
    - [x] An `automobile-usage` cannot be started for a `driver` that does not exist  
  - [x] Finish
    - [x] Cannot finish an `usage` that is already finished
  - [x] Read list
    - [x] Data that must be shown: full `register` object, `driver.name`, full `automobile` object
  
## Docs

- [ ] Create `README.md`
  - [ ] Title
  - [ ] Slogan
  - [ ] Description
  - [ ] Project structure
  - [ ] How to setup
  - [ ] How to run
  - [ ] How to test
  - [ ] How to lint
  - [ ] Useful links
    - [ ] Insomnia
    - [ ] Other docs links
- [ ] Create synced Insomnia repository

## Improvements

- [ ] Setup `docker`
  - [ ] Create `Dockerfile`
  - [ ] Create `docker-compose.yml`
  - [ ] Update `README.md` scripts
- [ ] Implement `PostgreSQL` database
- [ ] Rename routes to plural names and setup route base name on module
- [ ] Trim string on DTOs
- [ ] Maybe allow string filters to use regex instead of exact matching
- [ ] Save mocked data on separate files to make tests better readable
- [ ] Review code and add comments that could be useful
