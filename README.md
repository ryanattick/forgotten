# Forgotten

Forgotten is a logic-centered game in which users must solve puzzles to progress through levels of increasing difficulty. They must complete logic tasks that correspond to the trajectory of the storyline in order to unfold the mystery behind Forgotten.

## Ninja Rabbits Team

- Gregory Susko
- Matthew Palamos
- Ryan Attick
- Yessengerey 'Gary' Bolatov

## Roadmap

View the project roadmap [here](https://docs.google.com/document/d/1bp8A5CfTpHLk4qd1nRYLa5Q8vJ3ekPxDaFk9g7fnPWw/edit?usp=sharing)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

# Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)

## Usage

No specific usage requirements

## Requirements

- Node 6.9.x
- Redis 3.2.x
- Postgresql 9.6.x
- etc

## Development

### Installing System Dependencies

```
brew install redis
brew install postgresql
```

### Install Project Dependencies

```
npm install --save grunt grunt-cli
npm install -g grunt-cli knex eslint
```

## App Configuration

Override settings `config/default.json` in any environment by making a copy of `config/ENV.example.json` and naming it `config/ENV.json` and setting the appropriate variable.

For environments that require use of environment variables, you can supply variables as defined in `config/custom-environment-variables.json`.

See https://www.npmjs.com/package/config
And https://github.com/lorenwest/node-config/wiki/Environment-Variables#custom-environment-variables

## Database Initialization

IMPORTANT: ensure `postgres` is running before performing these steps.

### Database Creation:

Use grunt to create a new database for your development and test environments:

Development environment: `grunt pgcreatedb:default`

Other environments, specify like so: `NODE_ENV=test grunt pgcreatedb:default`

### Run Migrations & Data Seeds

In terminal, from the root directory:

To migrate to the latest version, run:

`knex migrate:latest --env NODE_ENV`

To rollback a version, run:

`knex migrate:rollback --env NODE_ENV`

To populate the database with seed data, run:

`knex seed:run --env NODE_ENV`

Note: `--env NODE_ENV` may be omitted for development. For example, `knex migrate:latest` will run all migrations in the development environment, while `knex migrate:latest --env test` will migrate in the test environment.

## Running the App

To run webpack build: `npm run build`

To run server: `npm run start`

To run tests: `npm run test`

To run your redis server for the session store `redis-server`
