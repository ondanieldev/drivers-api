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
  - [X] Update
  - [ ] Delete
  - [ ] Read by id
  - [ ] Read list
    - [ ] Allow filtering by `color` and `brand`
- [ ] Develop `driver` module
  - [ ] Create
  - [ ] Update
  - [ ] Delete
  - [ ] Read by id
  - [ ] Read list
    - [ ] Allow filtering by `name`
- [ ] Develop relationship between `automobile` and `driver`
  - [ ] Start
    - [ ] A `driver` can use only one `automibile` at the same time  
  - [ ] Finish
  - [ ] Read list
    - [ ] Data that must be shown: full `register` object, `driver.name`, full `automobile` object
  
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
